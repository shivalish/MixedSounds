import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('client/mainpage.html', { root: dirname(__dirname) })
});

//post - submit button
//DOES NOT CHECK WHETHER IT HAS BEEN MADE YET
router.post("/submit/:id", async(req, res) => {

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("history");

  let arr = await collection.findOne(query);

  let songs = arr.songs;

  songs.push(req.body);

  const updates = {
    $set: { songs: songs }
  };

  let result = await collection.updateOne(query, updates);

  res.send(result).status(204)

});

//post - song to playlist

export default router;