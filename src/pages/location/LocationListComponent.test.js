import {render, fireEvent} from '@testing-library/react';
import LocationListComponent from './LocationListComponent';

describe('test LocationListComponent', () => {
    describe('if it renders information', () => {
        it('should display id and test', () => {
            // arrange
            let callback = () => {};
            let list = [{id: 1, name: 'test 1'}];

            // act
            const app = render(<LocationListComponent listData={list} callback={callback}/>);
            const listItem = app.getByText('test 1');

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
                {id: 1, name: 'test 1'},
                {id: 2, name: 'test 2'},
                {id: 3, name: 'test 3'},
            ];

            const rendered = render(<LocationListComponent listData={list} callback={callback}/>);
            const button = rendered.getByText('test 2');

            // act
            fireEvent.click(button);

            // assert
            expect(button).toBeDefined();
            expect(clickCount).toBe(1);
            expect(returnData).toBe(list[1]);
        });
    });
    describe('if component can handle null values', () => {
        it('has location null but does not fail', () => {
            // arrange
            // act
            const t = () => {render(<LocationListComponent listData={null} callback={null}/>);};

            // assert
            expect(t).not.toThrow();
        });

    });
});