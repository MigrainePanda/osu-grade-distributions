function getCurrentEpoch() {
    const date = new Date();
    const customDateFormat = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return customDateFormat;
}

function termNumberToName(num) {
    const conversions = {
        "00": "Summer",
        "01": "Fall",
        "02": "Winter",
        "03": "Spring",
    };
    return conversions[num];
}

export { getCurrentEpoch, termNumberToName };
