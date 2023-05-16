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
router.post("/submit/:id", async(req, res) => {

    /*
    create song and add to database
    get song_id
    create rating and add to database
    get rating_id
    create listening history doc with song_id and rating_id
  */

  let usercollection = db.collection("userbase");
  let ratingscollection = db.collection("ratings");
  let songscollection = db.collection("songs");
  let historycollection = db.collection("history");

  let user = await usercollection.findOne({ _id: new ObjectId(req.params.id) });
  let history = await historycollection.findOne({ _id: user.history_id });

  let song_id = (await songscollection.insertOne(req.body.song)).insertedId;

  let rating_id = (await ratingscollection.insertOne(req.body.rating)).insertedId;

  history.history.push({song_id: song_id.valueOf(), rating_id: rating_id.valueOf() });

  const updates = {
    $set: { history : history.history }
  };

  let query = { _id: user.history_id };
  
  let result = await historycollection.updateOne(query, updates);
  
  res.send(result).status(204);

});

//post - song to playlist
router.post("/addsong/:name/:id", async (req, res) => {

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

export default router;