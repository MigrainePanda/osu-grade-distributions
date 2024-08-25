function termNumToName(str) {
    const numToName = {
      "00": "Summer",
      "01": "Fall",
      "02": "Winter",
      "03": "Spring"
    }
    return numToName[str];
}

function termNumToShortName(str) {
  const numToName = {
    "00": "Su",
    "01": "F",
    "02": "W",
    "03": "S"
  }
  return numToName[str];
}
  
export { termNumToName, termNumToShortName };