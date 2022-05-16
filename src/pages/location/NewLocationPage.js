import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, FormControl,
    Grid,
    InputLabel, MenuItem, Select,
    TextField,

} from '@mui/material';
import {useEffect, useId, useState} from 'react';
import LocationService from '../../services/LocationService';
import DeviceService from '../../services/DeviceService';

function NewLocationPage() {

    const locationApi = LocationService.LocationService();
    const deviceApi = DeviceService.DeviceService();
    // const productApi = ProductService.ProductService()
    // const presentationApi = PresentationService.PresentationService();

    const [locationName, setLocationName] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedPresentation, setSelectedPresentation] = useState('');

    const [locations, setLocations] = useState([]);
    const [products, setProducts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [presentations, setPresentations] = useState([]);

    useEffect(() => {
        locationApi.getAll().then((res, err) => {
            if (res) {
                setLocations(res.data);
            }
        });

        deviceApi.getAll().then((res, err) => {
            if (res) {
                setDevices(res.data);
            }
        });
    }, []);

    const handleChangeLocationName = (event) => {
        setLocationName(event.target.value);
    };
    const handleChangeProduct = (event) => {
        setSelectedProduct(event.target.value);
    };
    const handleChangeDevice = (event) => {
        setSelectedDevice(event.target.value);
    };
    const handleChangePresentation = (event) => {
        setSelectedPresentation(event.target.value);
    };

    const clearInput = () => {
        setLocationName('');
        setSelectedProduct('');
        setSelectedDevice('');
        setSelectedPresentation('');
    };

    const onSaveClick = () => {
        console.log('save clicked');
        clearInput();
    };

    const onClearClick = () => {
        console.log('clear clicked');
        clearInput();
    };


    return (
        <React.Fragment>
            <main>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={11} md={4} lg={3} mt={3}>
                        <Card>
                            <CardHeader
                                title="Create new location"
                            >
                            </CardHeader>
                            <CardContent>
                                <Grid container flexDirection={'column'}>
                                    <TextField sx={{m: 1}} id="standard-basic" label="Location name" variant="standard"
                                               value={locationName} onChange={handleChangeLocationName}/>
                                    <FormControl variant="standard" sx={{m: 1}}>
                                        <InputLabel id="select-product">Product</InputLabel>
                                        <Select
                                            labelId="select-product"
                                            id="select-product"
                                            value={selectedProduct}
                                            onChange={handleChangeProduct}
                                            label="Product"
                                        >
                                            <MenuItem id="0" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                products?.length > 0 &&
                                                    products.map(x => {
                                                        return (<MenuItem key={"product_" + x.id} value={x.id}>{x.id}</MenuItem>)
                                                    })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1}}>
                                        <InputLabel id="select-device">Device</InputLabel>
                                        <Select
                                            labelId="select-device"
                                            id="select-device"
                                            value={selectedDevice}
                                            onChange={handleChangeDevice}
                                            label="Device"
                                        >
                                            <MenuItem id="d0" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                devices?.length > 0 &&
                                                devices.map(x => {
                                                    return (<MenuItem key={"device_" + x.id} value={x.id}>{x.deviceId}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1}}>
                                        <InputLabel id="select-presentation">Presentation</InputLabel>
                                        <Select
                                            labelId="select-presentation"
                                            id="select-presentation"
                                            value={selectedPresentation}
                                            onChange={handleChangePresentation}
                                            label="Device"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                presentations?.length > 0 &&
                                                presentations.map(x => {
                                                    return (<MenuItem key={"presentation_" + x.id} value={x.id}>{x.id}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container justifyContent={'space-around'}>
                                    <Button size="small" onClick={onSaveClick}>Save</Button>
                                    <Button size="small" onClick={onClearClick}>Clear</Button>
                                </Grid>

                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

            </main>
        </React.Fragment>
    );

}

export default NewLocationPage;