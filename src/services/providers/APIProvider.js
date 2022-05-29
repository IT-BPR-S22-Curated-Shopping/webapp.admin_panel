import axios from 'axios';
import { useEffect }  from "react";

function APIProvider (configuration, eventManager) {
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.defaults.baseURL = configuration.baseUrl;

    const setAccessToken = (jwt) => axios.defaults.headers.common = {'Authorization': `${configuration.AuthType} ${jwt}`};

    const get = (path, headers = {}, params={}) => axios
    .get(
        path,
        {
            headers: headers,
            params: params
        }
    )

    const post =  (path, body, headers={}) => axios({
        method: 'post',
        url: path,
        headers: headers,
        data: body
    })

    const del = (path, headers = {}) => axios
    .delete(path,
        {
            headers: headers
        }
    );

    const put = (path, body, headers={}) => axios({
        method: 'put',
        url: path,
        headers: headers,
        data: body
    })

    useEffect(() => {
        eventManager.addListener(eventManager.event.loggedIn, setAccessToken)
        eventManager.addListener(eventManager.event.loggedOut, setAccessToken)

        return function cleanup() {
            eventManager.removeListener(eventManager.event.loggedIn, setAccessToken)
            eventManager.removeListener(eventManager.event.loggedOut, setAccessToken)
        };
    }, [])

    return {
        get, post, del, put
    }
}

export default APIProvider