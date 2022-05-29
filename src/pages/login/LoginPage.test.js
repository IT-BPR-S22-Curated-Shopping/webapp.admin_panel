import {render, fireEvent, act, screen} from '@testing-library/react';
import LoginPage from './LoginPage';
import EventManager from '../../managers/events/EventManager';

describe('test LoginPage', () => {
    describe('if it renders ', () => {
        it('should not throw error on render', async () => {
            // Arrange
            let manager = new EventManager();

            // act
            let ex = null;
            try {
                await act(async () => {
                    render(<LoginPage eventManager={manager}/>);
                });
            } catch (error) {
                ex = error;
            }

            // assert
            expect(ex).toBeFalsy();
        });
        it('should contain elements', async () => {
            // Arrange
            let manager = new EventManager();

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));

            let signInTexts = screen.getAllByText("Sign In");
            let emailLabels = screen.getAllByText("Email Address");
            let passwordLabels = screen.getAllByText("Password")
            let signInButton = screen.getByRole("button")

            // assert
            expect(signInTexts.length).toBe(2)
            expect(emailLabels.length).toBe(1)
            expect(passwordLabels.length).toBe(1)
            expect(signInButton).toBeTruthy()
            expect(signInButton).toHaveTextContent("Sign In")
        });
    });
    describe('On sign in button click', () => {
        it('correct email/pw should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(emailInput, {target: {value: 'test@test.dk'}})
            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).toHaveBeenCalled()
            expect(spyManager).toHaveBeenCalledWith(manager.event.login, {"email": "test@test.dk", "password": "1test2!"})
        })
        it('empty email entered should not fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "", "password": "1test2!"})
        })
        it('empty pw should not fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")

            fireEvent.change(emailInput, {target: {value: 'test@test.dk'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "test@test.dk", "password": ""})
        })
        it('Incorrect email format - no domain - should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(emailInput, {target: {value: 'test@'}})
            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "test@", "password": "1test2!"})
        })
        it('Incorrect email format - no tdl - should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(emailInput, {target: {value: 'test@test'}})
            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "test@test", "password": "1test2!"})
        })
        it('Incorrect email format - no @ - should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(emailInput, {target: {value: 'testtest.dk'}})
            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "testtest.dk", "password": "1test2!"})
        })
        it('Incorrect email format - no username - should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager();
            let spyManager = jest.spyOn(manager, 'invoke')

            // act
            await act(async () => render(<LoginPage eventManager={manager}/>));
            let signInButton = screen.getByRole("button")
            let emailInput = screen.getByTestId("textField-email")
            let passwordInput = screen.getByTestId("textField-password")

            fireEvent.change(emailInput, {target: {value: '@test.dk'}})
            fireEvent.change(passwordInput, {target: {value: '1test2!'}})
            fireEvent.click(signInButton);

            // assert
            expect(spyManager).not.toHaveBeenCalled()
            expect(spyManager).not.toHaveBeenCalledWith(manager.event.login, {"email": "@test.dk", "password": "1test2!"})
        })
    });
});