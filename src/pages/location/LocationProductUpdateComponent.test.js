/* eslint-disable testing-library/no-unnecessary-act */
import {act, fireEvent, render, screen} from "@testing-library/react";
import LocationServiceMock from "../../mocks/LoacationServiceMock";
import LocationProductUpdateComponent from "./LocationProductUpdateComponent";
import ProductServiceMock from "../../mocks/ProductServiceMock";



describe("LocationProductUpdateComponent test", () => {
    describe("Renders", () => {
        it("Should not throw error on render", async () => {
            await act(async () => {
                // Arrange
                let locationService = LocationServiceMock;
                let productService = ProductServiceMock;
                let callback = () => {};

                // Act
                const componentRendered = () => render(<LocationProductUpdateComponent
                    locationApi={locationService}
                    productApi={productService}
                    callback={callback()}
                />)

                // Assert
                expect(componentRendered).not.toThrow();
            })
        })

        it("Should contain Select product text", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let productService = ProductServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationProductUpdateComponent
                    locationApi={locationService}
                    productApi={productService}
                    callback={callback()}
                    open={modalOpen}
                />)
            );

            let text = screen.getAllByText("Select product");

            // Assert
            expect(text).toBeTruthy();
        })

        it("Should contain Save button", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let productService = ProductServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationProductUpdateComponent
                    locationApi={locationService}
                    productApi={productService}
                    callback={callback()}
                    open={modalOpen}
                />)
            );

            let saveButton = screen.getByText("Save");

            // Assert
            expect(saveButton).toBeTruthy();
        })

        it("Should contain Cancel button", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let productService = ProductServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationProductUpdateComponent
                    locationApi={locationService}
                    productApi={productService}
                    callback={callback()}
                    open={modalOpen}
                />)
            );

            let cancelButton = screen.getByText("Cancel");

            // Assert
            expect(cancelButton).toBeTruthy();
        })
    })
})