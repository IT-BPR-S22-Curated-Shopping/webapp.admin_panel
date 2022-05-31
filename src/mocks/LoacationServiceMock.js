import {ServiceResponseObject} from "../util/ServiceResponseObject";
import ServiceResponseEnum from "../util/ServiceResponseEnum";

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

export default LocationServiceMock;