import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('client/listeninghistory.html', { root: dirname(__dirname) })
});

//get - loads history
router.get("/", async (req, res) => {
    let collection = db.collection("history");
    let results = await collection.find({user_id: req.user_id })
      .toArray();
  
    res.send(results).status(200);
  });

export default router;