import {render, fireEvent} from '@testing-library/react';
import React from 'react';

import APIProvider from './providers/APIProvider';
import {axiosConfiguration} from '../configuration/AxiosConfiguration';
import EventManager from '../managers/events/EventManager';
import {event} from '../managers/events/Event';
import ProductService from './ProductService';


// spy implementation
jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());

describe('test service', () => {


    it('should call right endpoint for getAll', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = ProductService(api);

        // act
        service.getAll();

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/product")
    });

    it('should call right endpoint for get(id)', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = ProductService(api);

        // act
        service.get(1);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/product/1")
    });

    it('should call right endpoint for add', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'post').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = ProductService(api);
        let data = {name: "some Name", tags: [{id:1, tag:"testTag1"}], number: "123", image: "http://image.com/1.png"}
        // act
        service.add(data);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/product", data)
    });


    it('should call right endpoint for update', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'put').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = ProductService(api);
        let data = {id: 1, tags: ["tag1", "tag2", "tag3"]}
        // act
        service.updateTags(data.id, data.tags);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/product/"+data.id, data.tags)
    });


});
