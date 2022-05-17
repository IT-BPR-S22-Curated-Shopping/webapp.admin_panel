import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import {useEffect} from "react";


function AuthService(configuration, eventManager) {

    // Initialize Firebase
    const app = initializeApp(configuration);

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    let currentUser = auth.currentUser ? auth.currentUser : "User not logged in.";
    const login = async (payload) => {
        if (! (payload.email === undefined || payload.password === undefined)) {
            try {
                await signInWithEmailAndPassword(auth, payload.email, payload.password);
            } catch (e) {
                if (e.hasOwnProperty('code')) {
                    const message = e.code.split("/")
                    eventManager.invoke(eventManager.event().authError, message[message.length - 1]);
                }
                else {
                    console.log('Auth service login error: ' + e)
                }
            }
        }
    }
    const logout = () => auth.signOut().then(() => currentUser = null);
    const jwtToken = () => currentUser.accessToken ? currentUser.accessToken : "";

    useEffect(() => {
        eventManager.addListener(eventManager.event().login, login)
        eventManager.addListener(eventManager.event().logout, logout)

        // firebase token is automatically persisted (https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed_in_user)
        auth.onIdTokenChanged(user => {
            if (user) {
                currentUser = user;
                eventManager.invoke(eventManager.event().loggedIn, jwtToken());
            }
            else {
                if (currentUser) {
                    currentUser = null;
                    eventManager.invoke(eventManager.event().loggedOut, "");
                }
            }
        });

        return function cleanup() {
            eventManager.removeListener(eventManager.event().login, login)
            eventManager.removeListener(eventManager.event().logout, login)
        };
    }, [])
}

export default AuthService;






