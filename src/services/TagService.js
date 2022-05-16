import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';
import {BASE_URL} from '../util/constants';
import APIProvider from './providers/APIProvider';

function TagService() { //TODO: provider in constructor
    const api = APIProvider(BASE_URL);
    const path = '/tag';

    const getAll = () => {
        return api.get(`${path}`).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };


    const add = (data) => {
        return api.post(`${path}`, {
            name: data.name,
            tags: data.tags,
        }).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const update = (data) => {
        return api.put(`${path}/${data.id}`, data).
            then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
            catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    return {getAll, add};
}

function TagServiceMock() {

    const getAll = () => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, [
                {tag: 'tag1', id: 1},
                {tag: 'tag2', id: 2},
                {tag: 'tag3', id: 3},
                {tag: 'tag4', id: 4},
            ]);
            resolve(res);
        });
    };


    const add = (data) => {
        return data;
    };


    return {getAll, add};
}

export default {TagService, TagServiceMock};