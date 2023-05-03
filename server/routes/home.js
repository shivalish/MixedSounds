import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//post - submit button
router.post("/submit", async (req, res) => {
    let collection = db.collection("history");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });

//post - song to playlist

export default router;