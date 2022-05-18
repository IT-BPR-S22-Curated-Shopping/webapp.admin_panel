import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';
import {API_URL} from '../util/constants';
import APIProvider from './providers/APIProvider';

function LocationService() { //TODO: provider in constructor
    const api = APIProvider(API_URL);
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

    const addLocation = (data) => {
        return api.post(`${path}`, {
            name: data.name,
            productId: data.productId,
            deviceId: data.deviceId,
            presentationId: data.presentationId
        }).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const update = (location) => {
        return api.put(`${path}/${location.id}`, location).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const updateDevices = (id, devices) => {
        return api.put(`${path}/${id}/devices`, devices)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const updateProduct = (id, product) => {
        return api.put(`${path}/${id}/product`, product)
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };
    

    const removeLocation = (id) => {
        return api.del(`${path}/${id}`).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    return {getAll, get, addLocation, removeLocation, update, updateDevices};
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
        return {};
    };

    const removeLocation = (id) => {
        return {};
    };

    const update = (location) => {
        return {}
    }

    return {getAll, get, addLocation, removeLocation, update}
}

export default {LocationService, LocationServiceMock};