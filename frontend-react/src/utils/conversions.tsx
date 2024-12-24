function termNumToName(str) {
    const numToName = {
        "00": "Summer",
        "01": "Fall",
        "02": "Winter",
        "03": "Spring",
    };
    return numToName[str];
}

function termNumToShortName(str) {
    const numToName = {
        "00": "Su",
        "01": "F",
        "02": "W",
        "03": "S",
    };
    return numToName[str];
}

function getYearTermMap(arr) {
    const yt_dict = {};
    for (const obj of arr) {
        yt_dict[obj["year_term_id"]] = {
            term_number: obj["term_number"],
            calendar_year: obj["calendar_year"],
        };
        // if (
        //     obj["term_number"] === currTerm &&
        //     obj["calendar_year"] === currYear
        // ) {
        //     yt_id = obj["year_term_id"];
        //     break;
        // }
    }
    return yt_dict;
    // allYearsTerms.map((obj) => {
    //     yt_dict[obj["year_term_id"]] = { ...obj };
    // });
}

export { termNumToName, termNumToShortName, getYearTermMap };
