import {render, fireEvent, act, screen} from '@testing-library/react';
import AddChipsModalComponent from './AddChipsModalComponent';
import TagServiceMock from '../../mocks/TagServiceMock';
import ProductServiceMock from '../../mocks/ProductServiceMock';

describe('test AddChipsModalComponent', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            await act(async () => {
                // Arrange
                let tService = TagServiceMock();
                let pService = ProductServiceMock();
                let returnData = null;
                let callback = (data) => {
                    returnData = data;
                };
                let selectedProduct = (await pService.get()).data;

                // act
                const rendered = () => render(<AddChipsModalComponent
                    product={selectedProduct}
                    callback={callback}
                    tagService={tService}
                    productService={pService}/>);

                // assert
                expect(rendered).not.toThrow();
            });

        });
    });
});