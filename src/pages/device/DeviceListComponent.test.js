import {render, fireEvent} from '@testing-library/react';
import DeviceListComponent from './DeviceListComponent';


describe('test DeviceListComponent', () => {
    describe('if it renders information', () => {
        it('should display id and test', () => {
            // arrange
            let callback = () => {};
            let address = "Some mac address";
            let list = [{deviceId: address, companyId: 1234}];

            // act
            const app = render(<DeviceListComponent listData={list} callback={callback}/>);
            const listItem = app.getByText(1234);

            // assert
            expect(listItem).toBeDefined();
        });
    });
    describe('if listitem clicked once', () => {
        it('returns item clicked', () => {
            // Arrange
            let clickCount = 0;
            let returnData = null;
            let callback = (data) => {
                clickCount++;
                returnData = data;
            };
            let list = [
                {deviceId: 1, companyId: 'test 1'},
                {deviceId: 2, companyId: 'test 2'},
                {deviceId: 3, companyId: 'test 3'},
            ];

            const rendered = render(<DeviceListComponent listData={list} callback={callback}/>);
            const button = rendered.getByText('test 2');

            // act
            fireEvent.click(button);


            // assert
            expect(button).toBeDefined();
            expect(clickCount).toBe(1)
            expect(returnData).toBe(list[1])
        });
    });
});