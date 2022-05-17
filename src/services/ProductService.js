import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';
import APIProvider from './providers/APIProvider';

function ProductService() { //TODO: provider in constructor
    const api = APIProvider();
    const path = '/product';

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

    return {getAll, get, add, update};
}

function ProductServiceMock() {

    const getAll = () => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, [
                {name: 'Product 1', id: 1},
                {name: 'Product 2', id: 2},
                {name: 'Product 3', id: 3},
                {name: 'Product 4', id: 4},
            ]);
            resolve(res);
        });
    };

    const get = (id) => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS,
                {name: 'Product 1', id: 1, tags: [{id: 1, tag: 'tag1'}, {id: 2, tag: 'tag2'}, {id: 3, tag: 'tag3'}]},
            );
            resolve(res);
        });
    };

    const add = (name) => {
        return {};
    };

    const update = (location) => {
        return {};
    };

    return {getAll, get, add, update};
}

export default {ProductService, ProductServiceMock};