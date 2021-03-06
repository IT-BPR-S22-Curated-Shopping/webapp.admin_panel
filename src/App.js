import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {
    Device,
    Location, NewLocation,
    Product, NewProduct,
} from './util/components';
import {AppBarMenu, DrawerMenu, DrawerHeader} from './navigation/AppBarMenu';
import {Radar, LocationOn} from '@mui/icons-material';
import LoginPage from './pages/login/LoginPage';

import {firebaseConfiguration} from './configuration/FirebaseConfiguration.js';
import AuthService from './services/AuthService.js';
import {axiosConfiguration} from './configuration/AxiosConfiguration.js';
import APIProvider from './services/providers/APIProvider.js';
import DeviceService from './services/DeviceService.js';
import LocationService from './services/LocationService.js';
import ProductService from './services/ProductService.js';
import TagService from './services/TagService.js';

import DeviceServiceMock from './mocks/DeviceServiceMock.js';
import LocationServiceMock from './mocks/LoacationServiceMock.js';
import ProductServiceMock from './mocks/ProductServiceMock.js';
import TagServiceMock from './mocks/TagServiceMock.js';
import {useEffect} from 'react';

export default function App(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [authorized, setAuthorized] = React.useState(false);
    const navigate = useNavigate();
    const pages = [
        {name: 'Location', icon: <LocationOn/>},
        {name: 'Device', icon: <Radar/>},
        {name: 'Product', icon: <ShoppingBasketIcon/>},
    ];

    const eventManager = props.eventManager;
    AuthService(firebaseConfiguration, eventManager);
    const apiProvider = APIProvider(axiosConfiguration, eventManager);
    let deviceService;
    let locationService;
    let productService;
    let tagService;

    if (process.env['REACT_APP_USE_API'] === 'true') {
        console.log('Using API');
        deviceService = DeviceService(apiProvider);
        locationService = LocationService(apiProvider);
        productService = ProductService(apiProvider);
        tagService = TagService(apiProvider);
    } else {
        console.log('Using mocked services');
        deviceService = DeviceServiceMock();
        locationService = LocationServiceMock();
        productService = ProductServiceMock();
        tagService = TagServiceMock();

    }

    const updateAuthorized = (bool) => setAuthorized(bool);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLoggedIn = () => {
        updateAuthorized(true);
        navigate('/location');
    };

    const handleLoggedOut = () => {
        updateAuthorized(false);
        navigate('/');
    };

    // eslint-disable-next-line
    useEffect(() => {
        eventManager.addListener(eventManager.event.loggedIn, handleLoggedIn);
        eventManager.addListener(eventManager.event.loggedOut, handleLoggedOut);

        return function cleanup() {
            eventManager.removeListener(eventManager.event.loggedIn, handleLoggedIn);
            eventManager.removeListener(eventManager.event.loggedOut, handleLoggedOut);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBarMenu position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Curated Shopping Admin
                    </Typography>
                </Toolbar>
            </AppBarMenu>
            <DrawerMenu variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                {authorized ?
                    <List>
                        {pages.map((t, index) => (
                            <ListItem key={t.name} disablePadding sx={{display: 'block'}}
                                      onClick={() => navigate('/' + t.name.toLowerCase())}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {t.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={t.name} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    : null
                }
                <Divider/>
                {authorized ?
                    <ListItem key="Sign out" disablePadding sx={{display: 'block'}}
                              onClick={() => eventManager.invoke(eventManager.event.logout)}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    ml: open ? 'auto' : 1,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sign out" sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                    : null
                }
            </DrawerMenu>
            <Box component="main" sx={{flexGrow: 1, pl: 1}}>
                <DrawerHeader/>
                {authorized ?
                    <Routes>
                        <Route path="/location" element={
                            <Location deviceService={deviceService}
                                      locationService={locationService}
                                      productService={productService}
                            />}/>
                        <Route path="/location/:id" element={
                            <Location deviceService={deviceService}
                                      locationService={locationService}
                                      productService={productService}
                            />}/>
                        <Route path="/location/new" element={
                            <NewLocation deviceService={deviceService}
                                         locationService={locationService}
                                         productService={productService}
                            />}/>
                        <Route path="/device" element={
                            <Device deviceService={deviceService}
                            />}/>
                        <Route path="/product" element={
                            <Product productService={productService}
                                     tagService={tagService}
                            />}/>
                        <Route path="/product/new" element={
                            <NewProduct productService={productService}
                                        tagService={tagService}
                            />}/>
                    </Routes> :
                    <Routes>
                        <Route path="/" element={
                            <LoginPage eventManager={eventManager}
                            />}/>
                    </Routes>
                }
            </Box>
        </Box>
    );
}