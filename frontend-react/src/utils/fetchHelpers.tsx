import axios from "axios";

const API_URL = "http://localhost:8080/api";

async function fetchData(url) {
    return axios
        .get(API_URL + url)
        .then((resp) => {
            // console.log("Fetched " + url + ":", resp.data);
            return resp.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export { fetchData };
