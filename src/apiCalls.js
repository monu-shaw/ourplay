import axios from "axios"

const apiCalls =  axios.create({
        baseURL: 'http://localhost/ourplayapi/ajax.inc.php',
    });

export default apiCalls;