import {ServiceResponseObject} from './ServiceResponseObject';
import ServiceResponseEnum from '../util/ServiceResponseEnum';
import {BASE_URL} from '../util/constants';
import APIProvider from './providers/APIProvider';

function DeviceService() { //TODO: provider in constructor
    const api = APIProvider(BASE_URL);
    const path = '/device';

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

    return {getAll, get};
}

function DeviceServiceMock() {

    const getAll = () => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, [
                {name: 'Device 1', id: 1, deviceId: '6d37f0b8-084c-4bf5-87eb-893e6f7ccb50'},
                {name: 'Device 2', id: 2, deviceId: '170d9e8b-1f57-4ffb-aae0-01338dce089b'},
                {name: 'Device 3', id: 3, deviceId: '97a0d5f2-e5ac-45cd-bbf0-6e3252eb2484'},
                {name: 'Device 4', id: 4, deviceId: 'acafcc8a-447c-427c-a13b-62e8c2f3c21e'},
            ]);
            resolve(res);
        });
    };

    const get = (id) => {
        return new Promise((resolve, reject) => {
            let res = ServiceResponseObject(ServiceResponseEnum.SUCCESS, {
                id: 1,
                name: 'Device 1',
                deviceId: 'acafcc8a-447c-427c-a13b-62e8c2f3c21e',
                telemetry: 'ONLINE',
                status: 'SCANNING',
                location: 'location xyz',
                product: 'Beauti-Lamp',

                deviceLog: [
                    {msg: 'Connected'},
                    {msg: 'Received UUID: 6aedd569-7e2f-41fc-97e4-9aea1d2382d7'},
                    {msg: 'Received UUID: 0fb9f348-6a9c-4eed-82a2-2bb3fcaba8bb'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'New configuration received'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                    {msg: 'Received UUID: c37ec6bc-0889-426b-88a3-44948d8985f3'},
                ],

            });
            resolve(res);
        });
    };

    return {getAll, get};
}

export default {DeviceService, DeviceServiceMock};