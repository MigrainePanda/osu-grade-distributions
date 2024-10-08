import express from "express";
import secure from 'ssl-express-www';
import compression from "compression";
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
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + 'frontend-react/public'));
app.use(express.static(__dirname + '/'));
app.use(secure);
app.use(cors());

app.use(session({
  cookieName: 'session',
  secret: 'vxvxvsfwerwefwefwe',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(api);

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend-react/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend-react/dist/index.html'))
  });
}

// error handling
app.use(function(err, req, res, next) {
  console.error(err);
  if (err.sqlMessage) {
    res.status(500).send({message: sqlMessage});
  }
  else {
    res.status(500).send(err);
  }
});

app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

export default server;