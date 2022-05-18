import {ServiceResponseObject} from "../services/ServiceResponseObject";
import ServiceResponseEnum from "../util/ServiceResponseEnum";

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
    const remove = (id) => {
        return new Promise((resolve, reject) => {})
    }

    return {getAll, add, remove};
}

export default TagServiceMock;