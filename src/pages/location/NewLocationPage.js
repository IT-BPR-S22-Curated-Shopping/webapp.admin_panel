import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, FormControl,
    Grid,
    InputLabel, MenuItem, OutlinedInput, Select,
    TextField,

} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function NewLocationPage(props) {

    const locationApi = props.locationService;
    const deviceApi = props.deviceService;
    const productApi = props.productService;
    // const presentationApi = props.PresentationService;

    const [locationName, setLocationName] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [selectedPresentation, setSelectedPresentation] = useState('');

    const [locations, setLocations] = useState([]);
    const [products, setProducts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [presentations, setPresentations] = useState([]);

    const navigate = useNavigate();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        locationApi.getAll().then((res, err) => {
            if (res) {
                setLocations(res.data);
            }
        });

        deviceApi.getAllAvailable().then((res, err) => {
            if (res) {
                setDevices(res.data);
            }
        });

        productApi.getAll().then((res, err) => {
            if (res) {
                setProducts(res.data);
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
        const {
            target: {value},
        } = event;
        setSelectedDevices(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangePresentation = (event) => {
        setSelectedPresentation(event.target.value);
    };

    const clearInput = () => {
        setLocationName('');
        setSelectedProduct('');
        setSelectedDevices([]);
        setSelectedPresentation('');
    };

    const onSaveClick = () => {
        locationApi.addLocation({
            name: locationName,
            productId: selectedProduct,
            deviceIds: findCommonElements(devices, selectedDevices).map(x => x.id),
            presentationId: selectedPresentation,
        });
        // clearInput();
        // navigate('/location');
    };

    const onClearClick = () => {
        clearInput();
    };

    function findCommonElements(arr1, arr2) {
        return arr1.map(x => ({...x, is: arr2.includes(x.name)}));
    }

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
                                               inputProps={{'data-testid': 'textField-location-name'}}
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
                                                    return (<MenuItem key={'product_' + x.id}
                                                                      value={x.id}>{x.name}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1}}>
                                        <InputLabel id="select-device">Device</InputLabel>
                                        <Select
                                            labelId="select-device"
                                            id="select-device"
                                            multiple
                                            value={selectedDevices}
                                            onChange={handleChangeDevice}
                                            label="Device"
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {
                                                devices?.length > 0 &&
                                                devices.map(x => {
                                                    return (<MenuItem key={'device_' + x.deviceId}
                                                                      value={x.deviceId}>{x.deviceId}</MenuItem>);
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
                                                    return (<MenuItem key={'presentation_' + x.id}
                                                                      value={x.id}>{x.id}</MenuItem>);
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