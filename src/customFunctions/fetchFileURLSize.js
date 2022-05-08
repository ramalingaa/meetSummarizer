import axios from "axios";

const getFileURLSize = (url) => {
    return new Promise((res, rej) => {
        axios.head("https://stark-journey-87985.herokuapp.com/" + url)
        .then(response => {
            let c = parseInt(response.headers['content-length']);
            if(!isNaN(c)) res(c);
            else rej("Couldn't get file size");
        });
    });
}

export { getFileURLSize };