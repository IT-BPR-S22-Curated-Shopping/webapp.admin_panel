import {render, fireEvent, act, screen} from '@testing-library/react';
import DeviceServiceMock from '../../Mocks/DeviceServiceMock';
import DevicePage from './DevicePage';

describe('test DevicePage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let dService = DeviceServiceMock();

            await act(async ()=> {

                // act
                const rendered = () => render(<DevicePage deviceService={dService}/>);

                // assert
                expect(rendered).not.toThrow();
            })


        });

        it('should contain title', async () => {
            // Arrange
            let dService = DeviceServiceMock();

            // act
            await act(async ()=> render(<DevicePage deviceService={dService}/>))
            let title = screen.getAllByText("Devices")

            // assert
            expect(title).toBeTruthy()
        });

        it('should contain deviceService item', async () => {
            // Arrange
            let dService = DeviceServiceMock();

            // act
            await act(async ()=> render(<DevicePage deviceService={dService}/>))
            let button = screen.getByText("ID: " + (await dService.get()).data.deviceId)

            // assert
            expect(button).toBeTruthy()
        });
    });
});