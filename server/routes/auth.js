import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {registerUser} from "../db/dbclient.js";
import bcrypt from 'bcrypt';



const authRouter = Router();

// authRouter.post('/login', passport.authenticate('local'), (req, res) => {
//     res.send(200);
// });

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
    console.log(username);
    const hash = await bcrypt.hash(password, 10);
    try {
        let result = await registerUser(username, hash);
        alert(result);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Failed to register user");
    }
}
)

passport.use(new LocalStrategy(
    async (username, password, done) => { 
        const user = await getUser(username);
        if(!user){
            return done(null, false);
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false);
        }
        return done(null, user);
    }));

authRouter.post('/login', 
    passport.authenticate('local'), 
    (req, res) => {
        res.sendStatus(200);
    }
);

    export default authRouter;