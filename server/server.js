import home from "./routes/home.js";
import history from "./routes/history.js";
import playlists from "./routes/playlists.js";
import auth from "./routes/auth.js";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Load the routes
app.use(express.static(path.join(__dirname, '../client')));
app.use("/home", home);
app.use("/history", history);
app.use("/playlists", playlists);
app.use("/auth", auth);


app.listen(port, () => {
    console.log(`Hello we are on port: ${port}`);
});
