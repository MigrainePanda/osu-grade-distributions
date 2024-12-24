const IDToYearTerm = (arr, id) => {
    for (const obj of arr) {
        if (obj["year_term_id"] === id) {
            return [obj["calendar_year"], obj["term_number"]];
        }
    }
    return [-1, -1];
};

const IDToYear = (arr, id) => {
    for (const obj of arr) {
        if (obj["year_term_id"] === id) {
            return obj["calendar_year"];
        }
    }
    return -1;
};

const IDToCreditValue = (arr, id) => {
    for (const obj of arr) {
        if (obj["credit_id"] === id) {
            return obj["credit_value"];
        }
    }
    return "None";
};

export { IDToYearTerm, IDToYear, IDToCreditValue };
