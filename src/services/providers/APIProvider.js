import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

function APIProvider (baseUrl) {
    const get = (path, headers, params={}) => axios
    .get(
        baseUrl + path,
        {
            headers: headers,
            params: params
        }
    )

    const post =  (path, body, headers={}) => axios({
        method: 'post',
        url: baseUrl + path,
        headers: headers,
        data: body
    })

    const del = (path, headers) => axios
    .delete(baseUrl + path,
        {
            headers: headers
        }
    );

    const put = (path, body, headers={}) => axios({
        method: 'put',
        url: baseUrl + path,
        headers: headers,
        data: body
    })

    return {
        get, post, del, put
    }
}

export default APIProvider