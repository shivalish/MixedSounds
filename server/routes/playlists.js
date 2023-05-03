import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('client/playlists.html', { root: dirname(__dirname) })
});

//get - load playlists
router.get("/", async (req, res) => {
    let collection = db.collection("playlists");
    let results = await collection.find({user_id: req.user_id })
      .toArray();
  
    res.send(results).status(200);
  });

//post - create playlist
router.post("/addplaylist", async (req, res) => {
    let collection = db.collection("playlists");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });

//post - add song to playlist

//delete - delete a playlist
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
  
    const collection = db.collection("playlistss");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

export default router;