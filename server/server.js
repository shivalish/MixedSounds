// here for expressjs will add more in later
const express = require("express");
const server = express();
const port = 3000;
path = require('path');
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
server.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
