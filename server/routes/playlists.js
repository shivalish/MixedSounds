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

//get - load playlist
router.get("/:name/:id", async (req, res) => {

  let usercollection = db.collection("userbase");
  let playlistscollection = db.collection("playlists");
  let songscollection = db.collection("songs");

  let user = await usercollection.findOne({ _id: new ObjectId(req.params.id) });

  let playlists = await playlistscollection.findOne({ _id: user.playlists_id });

  let arr = playlists.playlists;

  let playlist = {};

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].name == req.params.name) {

      playlist.name = arr[i].name;
      playlist.songs = [];
  
      for (let j = 0; j < arr[i].songs.length; j++) {
  
        let songinfo = await songscollection.findOne({ _id: arr[i].songs[j] });
  
        playlist.songs.push(songinfo);
      
      }

      break;

    }

  }
  
  res.send(playlist).status(200);

});

//post - create playlist
router.post("/addplaylist/:name/:id", async (req, res) => {

  let userid = req.params.id;
  let playlistname = req.params.name;

  let usercollection = db.collection("userbase");
  let playlistscollection = db.collection("playlists");
  let user = await usercollection.findOne({ _id: new ObjectId(userid) });

  let query = { _id: user.playlists_id };

  let playlists = await playlistscollection.findOne(query);

  let arr = playlists.playlists;

  let newplaylist = {name: playlistname, songs: []};

  arr.push(newplaylist);

  const updates = {
    $set: { playlists: arr }
  };

  let result = await playlistscollection.updateOne(query, updates);

  res.send(result).status(204)

});

//post - add song to playlist
router.post("/addsong/:name/:id", async (req, res) => {

  //repeated code from /home/addsong
  let songid = req.body.song_id;
  let userid = req.params.id;
  let playlistname = req.params.name;

  let usercollection = db.collection("userbase");
  let playlistscollection = db.collection("playlists");
  let user = await usercollection.findOne({ _id: new ObjectId(userid) });

  let query = { _id: user.playlists_id };

  let playlists = await playlistscollection.findOne(query);

  let arr = playlists.playlists;

    //find playlist
    for (let p in arr) {

      if (arr[p].name === playlistname) {
        arr[p].songs.push(new ObjectId(songid));
        break;
      }
    }

  const updates = {
    $set: { playlists: arr }
  };

  let result = await playlistscollection.updateOne(query, updates);

  res.send(result).status(204);

});

//need to have id as "?id=" in url for some reason
//get playlist names
router.get("/playlistnames", async (req, res) => {

  let userid = req.query.id;

  let usercollection = db.collection("userbase");
  let playlistscollection = db.collection("playlists");
  let user = await usercollection.findOne({ _id: new ObjectId(userid) });

  let playlists = await playlistscollection.findOne({ _id: user.playlists_id });

  let arr = playlists.playlists;

  let names = [];

  for (let i = 0; i < arr.length; i++) {
    names.push(arr[i].name);
  }

  let results = {names: names};

  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);

});

//delete - delete a playlist
router.delete("/delete/:name/:id", async (req, res) => {

  let playlistname = req.params.name;
  let userid = req.params.id;
  
  let usercollection = db.collection("userbase");
  let playlistscollection = db.collection("playlists");
  let user = await usercollection.findOne({ _id: new ObjectId(userid) });

  let query = { _id: user.playlists_id };

  let playlists = await playlistscollection.findOne(query);

  let arr = playlists.playlists;

  let newarr = [];

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].name !== playlistname) {
      newarr.push(arr[i]);
    }

  }

  const updates = {
    $set: { playlists: newarr }
  };

  let result = await playlistscollection.updateOne(query, updates);

  res.send(result).status(204);

});

export default router;