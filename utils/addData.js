const addSubjectData = async (subject) => {
  const query = `INSERT IGNORE INTO subjects (short, last_updated) VALUES (?, ?)`;
  const values = [subject, helper.getCurrentEpoch()];
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
  });
}
    
const addCourseData = async (course, year, term) => {
  course["Subject"] = course["Course"].substring(0, course["Course"].indexOf(" "));

  const columns = `(short, subject, year, term, student_total, credit_hours, grade_pts, gpa_hours, gpa, last_updated, grade_data)`;
  const numValues = "?, ".repeat((columns.match(/,/g) || []).length+1);
  const valuesStr = numValues.substring(0, numValues.length-2);

  let gradeData = {};
  for (const key of Object.keys(course)) {
    if (key in helper.POSSIBLE_GRADES) {
      gradeData[key] = course[key];
    }
  }
  gradeData = JSON.stringify(gradeData);

  // const query = `UPDATE courses SET grade_data='${gradeData}' WHERE (short="${course["Course"]}" AND year="${year}" AND term="${term}")`;
  const query = `INSERT IGNORE INTO courses ${columns} VALUES (${valuesStr})`;
  const values = [
    course["Course"],
    course["Subject"],
    year,
    term,
    course["Student Total"],
    course["Credit Hours"],
    course["Grade Pts"],
    course["GPA Hours"],
    course["GPA"],
    helper.getCurrentEpoch(),
    gradeData
  ];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export { addSubjectData, addCourseData }