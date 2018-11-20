import axios from 'axios';
export default function callApiAo(endpoint, method, body) {
    return  axios({
        method : method,
        url : `http://5be5aa1148c1280013fc3dc5.mockapi.io/api/${endpoint}`,
        data : body
    }).catch(err => {
        console.log(err);
    })
}

