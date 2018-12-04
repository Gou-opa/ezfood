import axios from 'axios';
export default function callApi(endpoint, method, body) {
    return   axios({
        method : method,
        url : `http://chitbi.ddns.net:4004/${endpoint}`,
        data : body
    }).catch(err => {
        console.log(err);
    })
}
