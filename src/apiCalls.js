import axios from "axios"

const apiCalls =  axios.create({
        // baseURL: '/ourplayapi/ajax.inc.php',
        baseURL: 'http://localhost/ourplayapi/ajax.inc.php',
    });

export default apiCalls;