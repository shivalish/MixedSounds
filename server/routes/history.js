import express from "express";
import db from "../db/dbclient.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get - loads history
router.get("/", async (req, res) => {
    let collection = db.collection("history");
    let results = await collection.find({user_id: req.user_id })
      .toArray();
  
    res.send(results).status(200);
  });

export default router;