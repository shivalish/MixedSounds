import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import * as passport from 'passport'; 
import { Strategy as LocalStrategy } from 'passport-local';
import * as dbclient from "../db/dbclient.js";


// import db from '../db/dbclient';
const authRouter = Router();

// authRouter.post('/login', passport.authenticate('local'), (req, res) => {
//     res.send(200);
// });
authRouter.post('/register' [
    check(req.body.username)
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({min: 5})
    .withMessage("username must be at least 5 characters long"),
    check(req.body.password)
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({min: 5})
    .withMessage("password must be at least 5 characters long")
], async (req, res) => { 
    if(!validationResult(req).isEmpty()){
        console.log("error in validation");
        return res.status(400);
    }
}
)

passport.use(new LocalStrategy(
    async (username, password, done) => { 
        const userDB = await dbclient.db('musicdb')
        const userCollection = await userDB.userCollection("userbase");
        const result = await userCollection.insertOne({username: username,  password: password});
        console.log("user is registerd");
    }
    ));


    export default authRouter;