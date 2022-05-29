import {act, render, screen} from "@testing-library/react";
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

        it("Should contain Set Devices text", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let deviceService = DeviceServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationDeviceUpdateComponent
                    locationApi={locationService}
                    deviceApi={deviceService}
                    callback={callback()}
                    open={modalOpen}
                />)
            );

            let text = screen.getAllByText("Select identification devices");

            // Assert
            expect(text).toBeTruthy();
        })

        it("Should contain save button", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let deviceService = DeviceServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationDeviceUpdateComponent
                    locationApi={locationService}
                    deviceApi={deviceService}
                    callback={callback()}
                    open={modalOpen}
                />)
            );

            let saveButton = screen.getByText("Save");

            // Assert
            expect(saveButton).toBeTruthy();
        })

        it("Should contain cancel button", async () => {
            // Arrange
            let locationService = LocationServiceMock();
            let deviceService = DeviceServiceMock();
            let callback = () => {};
            let modalOpen = true;

            // Act
            await act(async () =>
                render(<LocationDeviceUpdateComponent
                    locationApi={locationService}
                    deviceApi={deviceService}
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