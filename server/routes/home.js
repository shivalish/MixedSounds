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
router.post("/submit/:name/:id", async(req, res) => {

  let name = req.params.name;
  let songname = req.body.name;
  let songinfo = req.body.info;

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("history");

  let songs = await collection.findOne(query);

  songs[name][songname] = songinfo;

  const updates = {
    $set: { [name] : songs[name] }
  };

  let result = await collection.updateOne(query, updates);

  res.send(result).status(204);

});

//post - song to playlist

//REWORK
router.post('addsong/:name/:id', async (req, res) => {

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("playlists");

  let user = await collection.findOne(query);

  let arr = user.playlists;

  let found = false;

  //find playlist
  for (let p in arr) {

    if (arr[p].name === req.params.name) {
      arr[p].songs.push(req.body);
      found = true;
      break;
    }

  }

  const updates = {
    $set: { playlists: arr }
  };

  let result = await collection.updateOne(query, updates);

  res.send(result).status(204)

});

export default router;