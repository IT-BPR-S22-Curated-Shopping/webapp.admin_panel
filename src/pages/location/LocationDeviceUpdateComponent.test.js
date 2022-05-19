import {act, render} from "@testing-library/react";
import LocationServiceMock from "../../mocks/LoacationServiceMock";
import DeviceServiceMock from "../../mocks/DeviceServiceMock";
import LocationDeviceUpdateComponent from "./LocationDeviceUpdateComponent";

describe("LocationDeviceUpdateComponent test", () => {
    describe("Renders", () => {
        it("Should not throw error on render", async () => {
            await act(async () => {
                // Arrange
                let locationService = LocationServiceMock;
                let deviceService = DeviceServiceMock;
                let callback = () => {};

                // Act
                const componentRendered = () => render(<LocationDeviceUpdateComponent
                    locationApi={locationService}
                    deviceApi={deviceService}
                    callback={callback()}
                />)

                // Assert
                expect(componentRendered).not.toThrow();
            })
        })
    })
})