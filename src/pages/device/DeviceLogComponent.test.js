import {render, fireEvent} from '@testing-library/react';
import DeviceLogComponent from './DeviceLogComponent';



describe('test DeviceListComponent', () => {
    describe('if it renders information', () => {
        it('should display title', () => {
            // arrange
            let list = [{msg: "log line 1"}, {msg: "log line 2"}, {msg: "log line 3"}];

            // act
            const app = render(<DeviceLogComponent log={list}/>);
            let element = app.getByRole("heading")

            // assert
            expect(element).toBeTruthy()
            expect(element).toHaveTextContent("Device log")
        });

        it('should contain a list', () => {
            // arrange
            let list = [{msg: "log line 1"}, {msg: "log line 2"}, {msg: "log line 3"}];

            // act
            const app = render(<DeviceLogComponent log={list}/>);
            let element = app.getByRole("list")

            // assert
            expect(element).toBeTruthy()
        });

        it('should not throw on empty or null list', () => {
            // arrange

            // act
            const appNull = () => render(<DeviceLogComponent log={null}/>);
            const appEmpty = () => render(<DeviceLogComponent log={[]}/>);


            // assert
            expect(appNull).not.toThrow()
            expect(appEmpty).not.toThrow()
        });

        it('should displays list items', () => {
            // arrange
            let list = [{msg: "log line 1"}, {msg: "log line 2"}, {msg: "log line 3"}];

            // act
            const app = render(<DeviceLogComponent log={list}/>);
            let element = app.getAllByRole("listitem")

            // assert
            expect(element).toBeTruthy()
            expect(element.length).toBe(list.length)
            for(let i = 0; i < element.length; i++) {
                expect(element[i]).toHaveTextContent(list[i].msg)
            }
        });
    });
});