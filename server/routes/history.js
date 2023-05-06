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

//get - fetches listening history
router.get("/:username/:id", async (req, res) => {

  let collection = db.collection("history");

  let arr = await collection.findOne({ _id: new ObjectId(req.params.id) });

  let username = req.params.username;

  if (!arr) res.send("Not found").status(404);
  else res.send(arr[username]).status(200);

});

//change comment

//change rating

export default router;