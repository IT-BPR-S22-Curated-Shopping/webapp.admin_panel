import {render, fireEvent, act, screen} from '@testing-library/react';
import LoginPage from './login';
import EventManager from '../../managers/events/EventManager';
import {event} from '../../managers/events/Event';

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

        it('should fire event on button click', async () => {
            // Arrange
            let manager = new EventManager(event);
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
            expect(spyManager).toHaveBeenCalledWith(event.login, {"email": "test@test.dk", "password": "1test2!"})
        })
    });
});