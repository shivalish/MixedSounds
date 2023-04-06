// here for expressjs will add more in later
const express = require("express");
const server = express();
const port = 3000;
path = require('path');
server.use(express.static(path.join(__dirname, '../client')));
server.use(express.static(path.join(__dirname, '..')));
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
server.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
