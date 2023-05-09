import { Router } from 'express';
import passport from passport
import expressSession from 'express-session'
import * as passport from 'passport'; 
import { Strategy } from 'passport-local';
import {dbclient} from "../db/db.js";
import db from '../db/dbclient';
const authRouter = Router();

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200);
});

passport.use(new Strategy(
    async (username, password, done) => { 
        const userDB = await client.db('musicdb')
        const userCollection = await userDB.userCollection("userbase");
        const result = await userCollection.insertOne({username: username,  password: password});
        console.log("user is registerd");
    }
    ));