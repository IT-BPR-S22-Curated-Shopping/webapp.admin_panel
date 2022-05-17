import axios from 'axios';
import { axiosConfiguration } from '../../configuration/AxiosConfiguration'
import EventManager from "../../managers/events/EventManager";
// import AuthService from '../AuthService'
// import {firebaseConfiguration} from "../../configuration/FirebaseConfiguration";

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.baseURL = axiosConfiguration.baseUrl;
// const auth = AuthService(firebaseConfiguration);
// auth.login("test@test.dk", "1test2!");

function APIProvider () {
    const setAccessToken = (jwt) => axios.defaults.headers.common = {'Authorization': `${axiosConfiguration.AuthType} ${jwt}`};

    // const eventManager = EventManager();
    // eventManager.addListener(eventManager.event().loggedIn, setAccessToken);
    // eventManager.addListener(eventManager.event().loggedOut, setAccessToken);

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

    return {
        get, post, del, put
    }
}

export default APIProvider