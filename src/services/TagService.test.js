import {render, fireEvent} from '@testing-library/react';
import React from 'react';

import APIProvider from './providers/APIProvider';
import {axiosConfiguration} from '../configuration/AxiosConfiguration';
import EventManager from '../managers/events/EventManager';
import {event} from '../managers/events/Event';
import TagService from './TagService';


jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());

describe('test service', () => {


    it('should call right endpoint for getAll', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'get').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = TagService(api);

        // act
        service.getAll();

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/tag")
    });

    it('should call right endpoint for add', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'post').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = TagService(api);
        let data = {id: 1, tags: ["tag1", "tag2", "tag3"]}

        // act
        service.add(data);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/tag", {tags: data.tags})
    });

    it('should call right endpoint for remove', () => {
        // arrange
        let api = APIProvider(axiosConfiguration, new EventManager(event));
        let spy = jest.spyOn(api, 'del').mockImplementation(() => new Promise((resolve, reject) => {}));
        let service = TagService(api);

        let data = {id: 1}
        // act
        service.remove(data.id);

        // assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("/tag/"+data.id)
    });

});
