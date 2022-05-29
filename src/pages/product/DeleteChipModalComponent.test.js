import {render, fireEvent, act, screen} from '@testing-library/react';
import TagServiceMock from '../../mocks/TagServiceMock';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import DeleteChipModalComponent from './DeleteChipModalComponent';

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
                const rendered = () => render(<DeleteChipModalComponent
                    product={selectedProduct}
                    callback={callback}
                    tagService={tService}/>);

                // assert
                expect(rendered).not.toThrow();
            });

        });

        it('should not display content if not opened', async () => {
            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();
            let returnData = null;
            let callback = (data) => {
                returnData = data;
            };
            let selectedProduct = (await pService.get()).data;
            let open = false;
            let setOpen = false;

            // act
            let html = null;
            await act(async () => {
                html = render(<DeleteChipModalComponent
                    product={selectedProduct}
                    callback={callback}
                    tagService={tService}
                    chip={{id: 1, tag: 'testTag1'}}
                    open={open}
                    setOpen={setOpen}
                />);
            });


            // assert
            let ex = null;
            try {
                let title = screen.getByLabelText('Delete tag (testTag1) from system.');
            } catch (error) {
                ex = error;
            }
            expect(ex).toBeTruthy();
        });

        it('should display content on open', async () => {

            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();
            let returnData = null;
            let callback = (data) => {
                returnData = data;
            };
            let selectedProduct = (await pService.get()).data;
            let open = true;
            let setOpen = false;

            // act
            await act(async () => render(<DeleteChipModalComponent
                product={selectedProduct}
                callback={callback}
                tagService={tService}
                chip={{id: 1, tag: 'testTag1'}}
                open={open}
                setOpen={setOpen}
            />));
            let title = screen.getByLabelText('Delete tag (testTag1) from system.');

            // assert
            expect(title).toBeTruthy()
        });

        it('should contain ok cancel buttons', async () => {
            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();
            let returnData = null;
            let callback = (data) => {
                returnData = data;
            };
            let selectedProduct = (await pService.get()).data;
            let open = true;
            let setOpen = false;

            // act
            await act(async () => render(<DeleteChipModalComponent
                product={selectedProduct}
                callback={callback}
                tagService={tService}
                chip={{id: 1, tag: 'testTag1'}}
                open={open}
                setOpen={setOpen}
            />));
            let ok = screen.getByText('Ok');
            let cancel = screen.getByText('Cancel');

            // assert
            expect(ok).toBeTruthy()
            expect(cancel).toBeTruthy()
        });


        it('should remove chip on save', async () => {
            // Arrange
            let tService = TagServiceMock();
            let spy = jest.spyOn(tService, 'remove')
            let pService = ProductServiceMock();
            let returnData = null;
            let callback = (data) => {
                returnData = data;
            };
            let selectedProduct = (await pService.get()).data;
            let open = true;
            let setOpen = false;

            // act
            await act(async () => render(<DeleteChipModalComponent
                product={selectedProduct}
                callback={callback}
                tagService={tService}
                chip={{id: 1, tag: 'testTag1'}}
                open={open}
                setOpen={setOpen}
            />));
            let okButton = screen.getByText('Ok');
            let checkbox = screen.getByTestId("confirm_checkbox")
            fireEvent.click(checkbox);
            fireEvent.click(okButton)


            // assert
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toBeCalledWith(1)

            // finish
            spy.mockRestore();
        });

    });
});