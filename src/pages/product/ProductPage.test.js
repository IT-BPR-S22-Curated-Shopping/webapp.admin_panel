import {render, fireEvent, act, screen} from '@testing-library/react';
import ProductPage from './ProductPage';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import TagServiceMock from '../../mocks/TagServiceMock';

// mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe('test LocationPage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let pService = ProductServiceMock();
            let tService = TagServiceMock();

            await act(async ()=> {

                // act
                const rendered = () => render(<ProductPage productService={pService} tagService={tService}/>);

                // assert
                expect(rendered).not.toThrow();
            })


        });

        it('should contain title', async () => {
            // Arrange
            let pService = ProductServiceMock();
            let tService = TagServiceMock();

            // act
            await act(async ()=> render(<ProductPage productService={pService} tagService={tService}/>))
            let title = screen.getByRole("heading")

            // assert
            expect(title).toBeTruthy()
            expect(title).toHaveTextContent("Product")
        });

        it('should render on empty props', async () => {
            // Arrange
            let pService = null;
            let tService = null;

            await act(async ()=> {

                // act
                const rendered = () => render(<ProductPage productService={pService} tagService={tService}/>);
                const renderedNoService = () => render(<ProductPage/>);

                // assert
                expect(rendered).not.toThrow();
                expect(renderedNoService).not.toThrow();
            })
        });

    });
});