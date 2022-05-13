import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';
import {BASE_URL} from '../util/constants';
import APIProvider from './providers/APIProvider';

function LocationService() { //TODO: provider in constructor
    const api = APIProvider(BASE_URL);
    const path = '/location';

    const getAll = () => {
        return api.get(`${path}`).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const get = (id) => {
        return api.get(`${path}/${id}`).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const addLocation = (name) => {
        return api.post(`${path}/name`, {
            name: name
        })
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, { errorMsg: error }))
    }

    return {getAll, get, addLocation};
}

function LocationServiceMock() {

    const getAll = () => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, [
                {name: 'Location 1', id: 1},
                {name: 'Location 2', id: 2},
                {name: 'Location 3', id: 3},
                {name: 'Location 4', id: 4},
            ]);
            resolve(res);
        });
    };

    const get = (id) => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, {
                    id: 1,
                    name: 'Location 1',
                    product: {
                        productNo: 1,
                        relatedProducts: [
                            'string',
                        ],
                        tags: [
                            {
                                id: 1,
                                tag: 'tag1',
                            },
                        ],
                    },
                    trackingDevices: [
                        {
                            name: 'Device 1',
                            id: 1,
                            deviceId: '6d37f0b8-084c-4bf5-87eb-893e6f7ccb50',
                        },
                    ],
                    presentationDevices: [
                        {
                            id: 1,
                            url: 'http://localhost:3000/some-url',
                            layout: {
                                horizontal: 'true',
                            },
                        },
                    ],
                },
            );
            resolve(res);
        });
    };

    const addLocation = (name) => {
        return {

        }
    }

    return {getAll, get, addLocation};
}

export default {LocationService, LocationServiceMock};