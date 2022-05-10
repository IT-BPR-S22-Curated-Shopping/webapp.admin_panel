import { createRoot } from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blue, blueGrey, red} from '@mui/material/colors';

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

root.render(
    <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
            <App tab="home" />
        </BrowserRouter>
    </ThemeProvider>
);