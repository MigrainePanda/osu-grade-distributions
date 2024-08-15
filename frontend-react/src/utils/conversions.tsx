function termNumToName(str) {
    const numToName = {
      "00": "Summer",
      "01": "Fall",
      "02": "Winter",
      "03": "Spring"
    }
    return numToName[str];
  }
  
  export { termNumToName };