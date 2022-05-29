import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';

function LocationService(api) { //TODO: provider in constructor
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

    const getLocationAnalysis = (locationId, from, to) => {
        const params = {
            from: from,
            to: to
        }

        return api.get(`/analysis/location/${locationId}`, {}, params)
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const addLocation = (data) => {
        return api.post(`${path}`, {
            name: data.name,
            productId: data.productId,
            deviceIds: data.deviceIds.join(', '),
            presentationId: data.presentationId
        })
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
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

    return {getAll, get, addLocation, removeLocation, update, updateDevices, updateProduct, getLocationAnalysis};
}



export default LocationService;