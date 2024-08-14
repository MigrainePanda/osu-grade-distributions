function termNumToName(arr) {
    const numToName = {
      "00": "Summer",
      "01": "Fall",
      "02": "Winter",
      "03": "Spring"
    }
  
    for (const obj of arr) {
      obj['termName'] = numToName[obj['term']]
    }
    return arr;
  }
  
  export { termNumToName };