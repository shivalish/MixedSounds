import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {getUser, registerUser} from "../db/user.js";
import bcrypt from 'bcrypt';
import session from 'express-session';

const authRouter = Router();

authRouter.use(session({
    secret: '326',
    resave: false,
    saveUninitialized: false,
}));

authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
// Convert a unique identifier to a user object.
passport.deserializeUser(async (username, done) => {
    const user = await getUser(username);
    done(null, user);
});

authRouter.post('/register', [
    body('username')
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({min: 5})
    .withMessage("Username must be at least 5 characters long"),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({min: 5})
    .withMessage("Password must be at least 5 characters long")

], async (req, res) => { 
    
    const {username, password} = req.body;

    if (getUser(username) !== null) {
        res.sendStatus(500);
    } else {

        const hash = await bcrypt.hash(password, 10);

        let result = await registerUser(username, hash);

        if (result !== null) {
            res.send({ redirectUrl: '/home' });
        } else {
            res.sendStatus(500);
        }

    }

})

passport.use(new LocalStrategy(

    async (username, password, done) => { 

        const user = await getUser(username);

        if(user == null){
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return done(null, false);
        }

        return done(null, user);

}));

authRouter.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.send({redirectUrl: "/"});
    } else {
        const err = new Error("You are not logged in!");
        err.status = 401;
        res.send(err);
    }
});

authRouter.post('/login', passport.authenticate('local'),
function(req, res) {
  res.send({ redirectUrl: '/home' });
});

export default authRouter;