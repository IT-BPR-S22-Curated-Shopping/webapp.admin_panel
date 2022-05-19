/* eslint-disable testing-library/no-unnecessary-act */
import {act, render, screen} from "@testing-library/react";
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
    })
})