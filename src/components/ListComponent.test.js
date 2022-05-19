import {render, fireEvent} from '@testing-library/react';
import ListComponent from './ListComponent';

describe('test ListComponent', () => {
    describe('if it renders information given', () => {
        it('should display id and value', () => {
            // arrange
            let returnData = null;
            let callback = (data) => {returnData = data;};
            let list = [{id: 1, value: 'test 1'}, {id: 2, value: 'test 2'}, {id: 3, value: 'test 3'}];

            // act
            const app = render(<ListComponent listData={list} callback={callback}/>);
            const listItemName = app.getByText('Name: test 2');
            const listItemId = app.getByText('Id: 2');

            // assert
            expect(listItemName).toBeDefined();
            expect(listItemName).toBeVisible();
            expect(listItemId).toBeDefined();
            expect(listItemId).toBeVisible();
        });
        it('should not throw exception on empty array', () => {
            // arrange
            let returnData = null;
            let callback = (data) => {returnData = data;};

            // act
            const appNullList = () => render(<ListComponent listData={null} callback={callback}/>);
            const appEmptyList = () => render(<ListComponent listData={[]} callback={callback}/>);

            // assert
            expect(appEmptyList).not.toThrow();
            expect(appNullList).not.toThrow();
        });
    });
    describe('if list item clicked once', () => {
        it('returns item clicked', () => {
            let returnData = null;
            let callback = jest.fn((data) => {returnData = data;})

            let list = [{id: 1, value: 'test 1'}, {id: 2, value: 'test 2'}, {id: 3, value: 'test 3'}];

            // act
            const app = render(<ListComponent listData={list} callback={callback}/>);
            const listItemName = app.getByText("Name: " + list[1].value);

            fireEvent.click(listItemName)

            // assert
            expect(callback).toBeCalledTimes(1)
            expect(callback).toBeCalledWith(list[1]);

        });
    });
});