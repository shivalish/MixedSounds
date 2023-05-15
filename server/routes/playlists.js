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

//REWORK ALL OF THESE

//get - load playlists
router.get("/:name/:id", async (req, res) => {

  //get objectid for user

  //get playlists

  //return playlists

    let collection = db.collection("playlists");
    let results = await collection.findOne({_id: new ObjectId(req.params.id)});
  
    res.send(results[req.params.name]).status(200);
  });

//post - create playlist
router.post("/addplaylist/:username/:id/:name", async (req, res) => {

  //get object id for user
  //get playlists
  //add json object {name : req.params.id, songs []} to playlists array

  let username = req.params.username;
  let playlistname = req.params.name;

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("playlists");

  let playlists = await collection.findOne(query);

  playlists[username][playlistname] = {};

  const updates = {
    $set: { [username] : playlists[username] }
  };

  let result = await collection.updateOne(query, updates);

  res.send(result).status(204)

  });

//post - add song to playlist
router.post("/addsong/:username/:id/:name", async (req, res) => {

  //get object id for user
  //fetch playlists for user
  //find playlidt by name

  let username = req.params.username;
  let playlistname = req.params.name;
  let songname = req.body.name;
  let songinfo = req.body.info;

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("playlists");

  let playlists = await collection.findOne(query);

  let songs = playlists[username][playlistname];

  songs[songname] = songinfo;

  const updates = {
    $set: { [username] : playlists[username] }
  };

  let result = await collection.updateOne(query, updates);

  res.send(songs).status(204)

});

//get playlist
router.get("/getplaylist/:username/:id/:name", async (req, res) => {

  let username = req.params.username;
  let playlistname = req.params.name;

  let query = { _id: new ObjectId(req.params.id) };

  let collection = db.collection("playlists");

  let playlists = await collection.findOne(query);

  let songs = playlists[username][playlistname];

  res.send(songs).status(200)

});

//delete - delete a playlist
router.delete("/delete/:username/:id/:name", async (req, res) => {

    let username = req.params.username;
    let playlistname = req.params.name;

    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("playlists");

    let playlists = await collection.findOne(query);

    delete playlists[username][playlistname];

    const updates = {
      $set: { [username] : playlists[username] }
    };
  
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);

});

export default router;