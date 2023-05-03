import home from "routes/home.js";
import history from "routes/history.js";
import playlists from "routes/playlists.js";

// here for expressjs will add more in later
const express = require("express");
const app = express();
const port = 3000;
path = require('path');
server.use(express.static(path.join(__dirname, '../client')));
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

server.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
