import {render, fireEvent, act, screen} from '@testing-library/react';

// mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

import LocationServiceMock from '../../mocks/LoacationServiceMock';
import LocationPage from './LocationPage';

describe('test LocationPage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let service = LocationServiceMock();

            await act(async ()=> {

                // act
                const rendered = () => render(<LocationPage locationService={service}/>);

                // assert
                expect(rendered).not.toThrow();
            })


        });

        it('should contain title', async () => {
            // Arrange
            let service = LocationServiceMock();

            // act
            await act(async ()=> render(<LocationPage locationService={service}/>))
            let title = screen.getByRole("heading")

            // assert
            expect(title).toBeTruthy()
            expect(title).toHaveTextContent("Location")
        });

        it('should render on empty props', async () => {
            // Arrange
            let service = null

            await act(async ()=> {

                // act
                const rendered = () => render(<LocationPage locationService={service}/>);
                const renderedNoService = () => render(<LocationPage/>);

                // assert
                expect(rendered).not.toThrow();
                expect(renderedNoService).not.toThrow();
            })
        });
        
    });
});