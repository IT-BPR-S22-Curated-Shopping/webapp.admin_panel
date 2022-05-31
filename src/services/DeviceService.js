import {ServiceResponseObject} from '../util/ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';

function DeviceService(api) { //TODO: provider in constructor
    const path = '/device';

    const getAll = () => {
        return api.get(`${path}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const getDeviceAnalysis = (deviceId, from, to) => {
        const params = {
            deviceId: deviceId,
            from: from,
            to: to
        }

        return api.get(`/analysis/device`, {}, params)
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const getAllAvailable = () => {
        return api.get(`${path}/available`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const get = (id) => {
        return api.get(`${path}/${id}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    return {getAll, get, getAllAvailable, getDeviceAnalysis};
}

export default DeviceService;