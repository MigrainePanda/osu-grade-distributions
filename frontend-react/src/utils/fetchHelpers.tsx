import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
