import express from 'express';
import cors from 'cors';

import {db} from './setup.js';
import * as query from "./query.js";
import * as helper from "./helper.js";

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  query.checkRefresh()
    .then(response => {
      if (response !== null) {
        console.log(`All instances were retrieved from the collection at ${helper.getCurrentTime()}.`);
        if (response[0] === undefined) {
          console.log(`No need to refresh yet at ${helper.getCurrentTime()}.`);
          res.json(`No need to refresh yet at ${helper.getCurrentTime()}.`);
          return;
        }

        helper.handleGeneralQuery(query.refreshToken(), req, res, `The refresh token has been updated at ${helper.getCurrentTime()}.`);
        helper.handleFilesCaller();
      } else {
        res.status(404).json({ Error: `There were no instances found on this server at ${helper.getCurrentTime()}.` });
      }         
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: `Server could not process or recognize the retrieval request at ${helper.getCurrentTime()}.` });
    });
});

app.get("/years", (req, res) => {
  helper.handleRetrieve(query.getAllYears(), req, res);
});

app.get("/terms", (req, res) => {
  helper.handleRetrieve(query.getAllTerms(), req, res);
});

app.get("/subjects", (req, res) => {
  helper.handleRetrieve(query.getAllSubjects(), req, res);
});

app.get("/courses", (req, res) => {
  helper.handleRetrieve(query.getAllCourses(), req, res);
});


app.listen(8800, () => {
  console.log("Server running on port 8800.");
});





