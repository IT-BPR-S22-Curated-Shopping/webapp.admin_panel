import {ServiceResponseObject} from "../services/ServiceResponseObject";
import ServiceResponseEnum from "../util/ServiceResponseEnum";

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

    const updateTags = (id, tags) => {
        return {};
    };

    return {getAll, get, add, updateTags};
}

export default ProductServiceMock;