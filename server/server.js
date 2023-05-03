import home from "./routes/home.js";
import history from "./routes/history.js";
import playlists from "./routes/playlists.js";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";

// here for expressjs will add more in later
//const express = require("express");
const app = express();
const port = 3000;
//path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '..')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(cors());
app.use(express.json());

// Load the routes
app.use("/home", home);
app.use("/history", history);
app.use("/playlists", playlists);

app.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
