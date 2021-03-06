import {ServiceResponseObject} from '../util/ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';

function ProductService(api) {
    const path = '/product';

    const getAll = () => {
        return api.get(`${path}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const get = (id) => {
        return api.get(`${path}/${id}`)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const getProductAnalysis = (productId, from, to) => {
        const params = {
            from: from,
            to: to
        }

        return api.get(`/analysis/product/${productId}`, {}, params)
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };

    const add = (data) => {
        return api.post(`${path}`, {
            name: data.name,
            tags: data.tags,
            number: data.number,
            image: data.image
        })
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    };
    //
    // const update = (data) => {
    //     return api.put(`${path}/${data.id}`, data).
    //         then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data)).
    //         catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    // };

    const updateTags = (id, tags) => {
        return api.put(`${path}/${id}`, tags)
        .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
        .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    }

    const update = (product) => {
        return api.put(`${path}`, product)
            .then(res => ServiceResponseObject(ServiceResponseEnum.SUCCESS, res.data))
            .catch(error => ServiceResponseObject(ServiceResponseEnum.ERROR, {errorMsg: error}));
    }

    return {getAll, get, add, updateTags, getProductAnalysis, update};
}

export default ProductService;