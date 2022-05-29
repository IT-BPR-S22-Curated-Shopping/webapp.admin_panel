import React from 'react';

import APIProvider from './providers/APIProvider';
import {axiosConfiguration} from '../configuration/AxiosConfiguration';
import EventManager from '../managers/events/EventManager';
import {event} from '../managers/events/Event';
import DeviceService from './DeviceService';

jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());

describe('test service', () => {


    it('should call right endpoint for getAll', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = DeviceService(api);

        // act
        service.getAll();

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/device")
    });

    it('should call right endpoint for get(id)', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = DeviceService(api);

        // act
        service.get(1);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/device/1")
    });

});
