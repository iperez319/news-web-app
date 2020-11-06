import axios from 'axios';

export function get(url, params) {
    return axios({
        method: 'get',
        url,
        params,
    }).then(resp => resp.data);
}

export function post(url, data, params) {
    // const url = `${path}`;

    return axios({
        method: 'post',
        url,
        data,
        params,
    });
}
