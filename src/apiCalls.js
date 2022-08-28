import axios from "axios"

const apiCalls =  axios.create({
        baseURL: 'https://shaw101ways.ga/ourplayapi/ajax.inc.php',
    });

export default apiCalls;