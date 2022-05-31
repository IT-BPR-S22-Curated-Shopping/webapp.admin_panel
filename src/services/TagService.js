import {ServiceResponseObject} from '../util/ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';

function TagService(api) {
    const path = '/tag';

    const getAll = () => {
        return api.get(`${path}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const add = (data) => {
        return api.post(`${path}`, {
            tags: data.tags,
        })
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const remove = (id) => {
        return api.del(`${path}/${id}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    }

    return {getAll, add, remove};
}

export default TagService;