import { createRoot } from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey} from '@mui/material/colors';
import EventManager from "./managers/events/EventManager";

const container = document.getElementById('root');
const root = createRoot(container);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: blueGrey[900]
        }
    },

});

const eventManager = EventManager();

root.render(
    <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
            <App tab="home" eventManager={eventManager} />
        </BrowserRouter>
    </ThemeProvider>
);