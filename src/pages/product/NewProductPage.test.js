import {render, fireEvent, act, screen} from '@testing-library/react';

import NewProductPage from './NewProductPage';
import TagServiceMock from '../../mocks/TagServiceMock';
import ProductServiceMock from '../../mocks/ProductServiceMock';
import ProductService from '../../services/ProductService';
import TagService from '../../services/TagService';


describe('test NewProductPage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();

            await act(async ()=> {

                // act
                const rendered = () => render(<NewProductPage productService={pService} tagService={tService}/>);

                // assert
                expect(rendered).not.toThrow();
            })
        });

        it('should contain title', async () => {
            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();

            // act
            await act(async ()=> render(<NewProductPage productService={pService} tagService={tService}/>))
            let title = screen.getByText("New Product", {hidden:true})

            // assert
            expect(title).toBeTruthy()
        });

        it('should contain elements for new product', async () => {
            // Arrange
            let tService = TagServiceMock();
            let pService = ProductServiceMock();

            // act
            await act(async ()=> render(<NewProductPage productService={pService} tagService={tService}/>))
            let nameInput = screen.getByText("Name", {hidden: true})
            let numberInput = screen.getByText("Product Number");
            let imageInput = screen.getByText("Product Image");
            let tagInput = screen.getByText("Associate tags", {hidden: true});
            let createButton = screen.getByText("Create");
            let clearButton = screen.getByText("Clear");

            // assert
            expect(nameInput).toBeTruthy();
            expect(numberInput).toBeTruthy();
            expect(imageInput).toBeTruthy();
            expect(tagInput).toBeTruthy();
            expect(createButton).toBeTruthy();
            expect(clearButton).toBeTruthy();

        });

        it('should call api on save click', async () => {
            // Arrange
            let pService = ProductServiceMock();
            let tService = TagServiceMock();
            let pServiceSpy = jest.spyOn(pService, 'add')

            // act
            await act(async ()=> render(<NewProductPage productService={pService} tagService={tService}/>))
            let nameInput = screen.getByTestId("textField-product-name")
            let numberInput = screen.getByTestId("textField-product-number");
            let imageInput = screen.getByTestId("textField-product-image");
            let createButton = screen.getByText("Create");

            fireEvent.change(nameInput, {target: {value: 'new product name'}})
            fireEvent.change(numberInput, {target: {value: '123'}})
            fireEvent.change(imageInput, {target: {value: 'http://some.image/123.png'}})
            fireEvent.click(createButton);

            // assert
            expect(pServiceSpy).toHaveBeenCalledTimes(1);
            expect(pServiceSpy).toHaveBeenCalledWith({image: "http://some.image/123.png", name: "new product name", number: "123", tags: []})

        });

        it('should have inputted values', async () => {
            // Arrange
            let pService = ProductServiceMock();
            let tService = TagServiceMock();

            // act
            await act(async ()=> render(<NewProductPage productService={pService} tagService={tService}/>))
            let nameInput = screen.getByTestId("textField-product-name")
            let numberInput = screen.getByTestId("textField-product-number");
            let imageInput = screen.getByTestId("textField-product-image");

            fireEvent.change(nameInput, {target: {value: 'new product name'}})
            fireEvent.change(numberInput, {target: {value: '123'}})
            fireEvent.change(imageInput, {target: {value: 'http://some.image/123.png'}})


            // assert
            expect(nameInput.value).toBe("new product name")
            expect(numberInput.value).toBe("123")
            expect(imageInput.value).toBe("http://some.image/123.png")

        })

        it('should clear all fields on clear click', async () => {
            // Arrange
            let pService = ProductServiceMock();
            let tService = TagServiceMock();
            let pServiceSpy = jest.spyOn(pService, 'add')

            // act
            await act(async ()=> render(<NewProductPage productService={pService} tagService={tService}/>))
            let nameInput = screen.getByTestId("textField-product-name")
            let numberInput = screen.getByTestId("textField-product-number");
            let imageInput = screen.getByTestId("textField-product-image");
            let button = screen.getByText("Clear");

            fireEvent.change(nameInput, {target: {value: 'new product name'}})
            fireEvent.change(numberInput, {target: {value: '123'}})
            fireEvent.change(imageInput, {target: {value: 'http://some.image/123.png'}})
            fireEvent.click(button);


            // assert
            expect(nameInput.value).toBe("")
            expect(numberInput.value).toBe("")
            expect(imageInput.value).toBe("")

        })

    });
});