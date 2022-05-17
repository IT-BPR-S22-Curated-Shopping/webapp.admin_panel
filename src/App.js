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
import ListItemText from '@mui/material/ListItemText';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {
    About, Device, Home,
    Location, NewLocation,
    Product, NewProduct,
} from './util/components';
import {AppBarMenu, DrawerMenu, DrawerHeader} from './navigation/AppBarMenu';
import {HomeRounded, Radar, Devices, LocationOn, Layers, WbIridescent} from '@mui/icons-material';

export default function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const pages = [
        {name: 'Home', icon: <HomeRounded/>},
        {name: 'Device', icon: <LocationOn/>},
        {name: 'Location', icon: <Radar/>},
        {name: 'Product', icon: <WbIridescent/>},
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        Admin panel
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
                <Divider/>
                <p> stuff</p>
            </DrawerMenu>
            <Box component="main" sx={{flexGrow: 1, pl: 1}}>
                <DrawerHeader/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/location" element={<Location/>}/>
                    <Route path="/location/:id" element={<Location/>}/>
                    <Route path="/location/new" element={<NewLocation/>}/>
                    <Route path="/device" element={<Device/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/product/new" element={<NewProduct/>}/>
                </Routes>
            </Box>
        </Box>
    );
}
