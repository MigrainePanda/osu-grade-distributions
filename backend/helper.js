import fs from 'fs';
import readline from 'readline';
import * as query from "./query.js";

const POSSIBLE_GRADES = {"A": 1, "A-": 1, "B+": 1, "B": 1, "B-": 1, "C+": 1, "C": 1, "C-": 1, "D+": 1, "D": 1, "D-": 1, "F": 1};
const CSV_PATH = "data";

function handleGeneralQuery(func, req, res, successStr) {
  func
    .then(response => {
      if (response !== null) {
        console.log(successStr);
        res.json(response);
      } else {
        res.status(404).json({ Error: `There were no instances found on this server at ${getCurrentTime()}.` });
      }         
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ Error: `Server could not process or recognize the retrieval request at ${getCurrentTime()}.` });
    });
}

function handleRetrieve(func, req, res) {
  handleGeneralQuery(func, req, res, `All instances were retrieved from the collection at ${getCurrentTime()}.`);
}

function getCurrentTime() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const date = today.toUTCString();
  return date;
}

function getCurrentEpoch() {
  return Math.round((new Date()).getTime() / 1000);
}


async function handleFilesCaller() {
  const files = fs.readdirSync(CSV_PATH);
  let path = "";
  for (const file of files) {
    if (file == "test.csv") {
      continue;
    }
    path = `${CSV_PATH}/${file}`;

    await new Promise((resolve, reject) => {
      handleFile(path, (subjects, courses) => {
        let idx = path.indexOf("/")+1;
        let year = path.substring(idx, idx+4);
        let term = path.substring(idx+5, idx+7);
        // console.log("courses: ", courses);
        
        for (let i=0; i<subjects.length; i++) {
          query.addSubjectData(subjects[i]);
        }
        for (let i=0; i<courses.length; i++) {
          query.addCourseData(courses[i], year, term);
        }
        resolve();
      });
    })
    
  }
  
}

function handleFile(path, callback) {
  const stream = fs.createReadStream(path);
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });
  
  const subjects = new Set();
  const courses = [];
  let grades = {};
  reader.on('line', (line) => {
    function toDict(cols) {
      let dict = {}
      for (let i=0; i<cols.length; i++) {
        let temp = cols[i].split(": ");
        dict[temp[0]] = temp[1];
      }
      return dict;
    }
    function formatter (line) {
      let cols = line.split(",");

      if (line === ",,," && Object.keys(grades).length > 0) {
        courses.push(grades);
        grades = {};
        return;
      }
      if (line.substring(0, 6) === "Course") {
        cols = cols.filter((str) => {
          return str.length !== 0;
        })[0];
        cols = toDict(cols.split("  "));
        grades["Course"] = cols["Course"];
        grades["Student Total"] = cols["Student Total"];
        grades["Credit Hours"] = cols["Credit Hours"];
        grades["Grade Pts"] = cols["Grade Pts"];
        grades["GPA Hours"] = cols["GPA Hours"];
        grades["GPA"] = cols["GPA"];

        let subject = cols["Course"].substring(0, cols["Course"].indexOf(" "));
        subjects.add(subject);
      }
      if (line[0] === "G") {
        cols = cols.map((str) => str.trim());
        cols = toDict(cols);
        let letter = cols["Grade"];
        if (letter in POSSIBLE_GRADES && !(letter in grades)) {
          grades[letter] = cols["Pct"];
        }
      }
    }

    formatter(line);
  });
  
  reader.on('close', () => {
    let subjectsArr = Array.from(subjects);
    callback(subjectsArr, courses);
  });
}

export { POSSIBLE_GRADES, handleGeneralQuery, handleRetrieve, getCurrentTime, getCurrentEpoch, handleFilesCaller };