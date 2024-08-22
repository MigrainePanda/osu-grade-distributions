import express from "express";
import cors from "cors";
import session from "client-sessions";
import api from "./api.js";

import { configDotenv } from "dotenv";
configDotenv();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 


const app = express();
const port = process.env.DB_PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(express.static(__dirname +'/'));
app.use(cors());

app.use(session({
  cookieName: 'session',
  secret: 'fsdalfjaslfjsdk',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(api);

app.use(function(err, req, res, next) {
  console.error(err);
  if (err.sqlMessage) {
    res.status(500).send({message: sqlMessage});
  }
  else {
    res.status(500).send(err);
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

export default server;