import {render, fireEvent, act, screen} from '@testing-library/react';
import LocationServiceMock from '../../mocks/LoacationServiceMock';
import NewLocationPage from './NewLocationPage';
import DeviceServiceMock from '../../mocks/DeviceServiceMock';
import React from 'react';
import ProductServiceMock from '../../mocks/ProductServiceMock';

// mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe('test NewLocationPage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let dService = DeviceServiceMock();
            let lService = LocationServiceMock();
            let pService = ProductServiceMock();

            await act(async ()=> {

                // act
                const rendered = () => render(<NewLocationPage locationService={lService} deviceService={dService} productService={pService}/>);

                // assert
                expect(rendered).not.toThrow();
            })
        });

        it('should contain title', async () => {
            // Arrange
            let dService = DeviceServiceMock();
            let lService = LocationServiceMock();
            let pService = ProductServiceMock();

            // act
            await act(async ()=> render(<NewLocationPage locationService={lService} deviceService={dService} productService={pService}/>))
            let title = screen.getByText("Create new location", {hidden:true})

            // assert
            expect(title).toBeTruthy()
        });

        it('should contain elements for new location', async () => {
            // Arrange
            let dService = DeviceServiceMock();
            let lService = LocationServiceMock();
            let pService = ProductServiceMock();

            // act
            await act(async ()=> render(<NewLocationPage locationService={lService} deviceService={dService} productService={pService}/>))
            let element = screen.getByText("Location name", {hidden: true})
            let elements = screen.getAllByRole("button", {hidden: true})

            // assert
            expect(element).toBeTruthy();
            expect(element).toBeVisible();
            expect(elements).toBeTruthy()
            expect(elements.length).toBe(5)
            expect(elements[elements.length-2]).toHaveTextContent("Save")
            expect(elements[elements.length-1]).toHaveTextContent("Clear")
            expect(element).toHaveTextContent("Location name")
        });

        it('should call api on save click', async () => {
            // Arrange
            let dService = DeviceServiceMock();
            let lService = LocationServiceMock();
            let pService = ProductServiceMock();
            let lServiceSpy = jest.spyOn(lService, 'addLocation')

            // act
            await act(async ()=> render(<NewLocationPage locationService={lService} deviceService={dService} productService={pService}/>))
            let button = screen.getByText("Save", {hidden: true})
            let locationNameInput = screen.getByTestId('textField-location-name');


            fireEvent.change(locationNameInput, {target: {value: 'new location name'}})
            fireEvent.click(button);

            // // assert
            expect(button).toBeTruthy();
            expect(lServiceSpy).toHaveBeenCalledTimes(1)
            //TODO: check if api has been called with right parameters

        });


    });
});