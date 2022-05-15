import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Grid} from '@mui/material';

import LocationListComponent from './LocationListComponent';
import LocationService from '../../services/LocationService';

import ServiceResponseEnum from '../../util/ServiceResponseEnum';
import {useNavigate, useParams} from 'react-router-dom';
import DeviceService from '../../services/DeviceService';

function LocationPage() {
    const params = useParams();
    const apiLocation = LocationService.LocationServiceMock();
    const apiDevice = DeviceService.DeviceServiceMock();
    const [locationList, setLocationList] = React.useState([]);
    const [locationDetails, setLocationDetails] = React.useState();
    const navigate = useNavigate();


    const clickCallback = (data) => {
        navigate('/location/' + data.id);
        apiLocation.get(data.id).then((res, error) => {
                setLocationDetails(res.data);
            },
        );
    };

    const handleAddLocationClick = () => {
        navigate('/location/new')
    }

    const removeLocationClick = (location) => {
        apiLocation.removeLocation(location.id).then((res) => {
            if (res.state === ServiceResponseEnum.SUCCESS) {
                let index = locationList.findIndex(x => x.id === location.id);
                if (index > -1) {
                    setLocationList([
                        ...locationList.slice(0, index),
                        ...locationList.slice(index + 1, locationList.length),
                    ]);
                    setLocationDetails(null);
                } else {
                    // something went wrong
                    console.log('could not find item in list');
                }

            }
        });
    };

    useEffect(() => {
        if (params.id != null || params.id !== {}) {
            clickCallback({id: params.id});
        }

        apiLocation.getAll().then((res, err) => {
            setLocationList(res.data);
        });
    }, []);

    return (
        <React.Fragment >
            <main>
                <Grid container height={'93vh'}>
                    <Grid item xs={4}
                        sx={{borderRight: 1}}
                        justifyContent="top"
                        alignItems="left">
                        <Box pt={2}>
                            <Typography variant="h6" textAlign={'center'}>
                                Locations
                            </Typography>

                            <LocationListComponent listData={locationList} callback={clickCallback}/>

                            <Button onClick={handleAddLocationClick}>Add location</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={4}
                          sx={{borderRight: 1}}>
                        <Box p={2}>
                            {
                                locationDetails != null && (
                                    <div>
                                        <p>id: {locationDetails.id}</p>
                                        <p>name: {locationDetails.name}</p>
                                        <p>presentation devices: {locationDetails.presentationDevices.map((x) => x.id).
                                            toString()}</p>
                                        <p>products: {locationDetails.product != null && locationDetails.product.productNo
                                            ? locationDetails.product.productNo
                                            : ''},
                                            tags: {locationDetails.product != null && locationDetails.product.tags != null
                                                ? locationDetails.product.tags.map((x) => x.tag).toString()
                                                : ''}
                                        </p>
                                        <p>devices: {locationDetails.trackingDevices.map((x) => x.name).toString()}</p>
                                        <Button onClick={() => removeLocationClick(locationDetails)}>Remove
                                            location</Button>
                                    </div>
                                )}
                        </Box>
                    </Grid>
                    <Grid item xs={4}
                          sx={{borderRight: 1}}>
                        <Box p={2}>
                            <Button>Set device</Button>
                            <Button>Set presentation</Button>
                            <Button>Set product</Button>
                        </Box>
                    </Grid>
                </Grid>

            </main>
        </React.Fragment>
    );
}

export default LocationPage;
