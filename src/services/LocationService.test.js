import {render, fireEvent} from '@testing-library/react';
import React from 'react';

import APIProvider from './providers/APIProvider';
import {axiosConfiguration} from '../configuration/AxiosConfiguration';
import EventManager from '../managers/events/EventManager';
import {event} from '../managers/events/Event';

import LocationService from './LocationService';

// mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
// spy implementation
jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());

describe('test service', () => {

    it('should call right endpoint for getAll', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = LocationService(api);

        // act
        service.getAll();

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/location")
    });

    it('should call right endpoint for get(id)', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = LocationService(api);

        // act
        service.get(1);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/location/1")
    });

    it('should call right endpoint for addLocation', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'post').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = LocationService(api);
        let data = {name: "some Name", productId: "1", deviceIds: [1, 2, 3], presentationId: "presentationId"}
        // act
        service.addLocation(data);

        // assert
        let expectedData = data;
        expectedData.deviceIds = expectedData.deviceIds.join(', ')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/location", expectedData)
    });


    it('should call right endpoint for update', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'put').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = LocationService(api);
        let data = {id: 1, name: "some Name", productId: "1", deviceId: "customdeviceid", presentationId: "presentationId"}
        // act
        service.update(data);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/location/"+data.id, data)
    });

    it('should call right endpoint for remove', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'del').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = LocationService(api);
        let data = {id: 1, name: "some Name", productId: "1", deviceId: "customdeviceid", presentationId: "presentationId"}
        // act
        service.removeLocation(data.id);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/location/"+data.id)
    });

});
