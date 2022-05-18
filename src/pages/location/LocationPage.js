import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Grid} from '@mui/material';
import LocationService from '../../services/LocationService';
import ServiceResponseEnum from '../../util/ServiceResponseEnum';
import {useNavigate, useParams} from 'react-router-dom';
import ListComponent from '../../components/ListComponent';
import LocationDeviceUpdateComponent from "./LocationDeviceUpdateComponent";

function LocationPage() {
    const params = useParams();
    const apiLocation = LocationService.LocationService();
    const [locationList, setLocationList] = React.useState([]);
    const [locationDetails, setLocationDetails] = React.useState();
    const [identificationDeviceUpdateModalOpen, setIdentificationDeviceUpdateModalOpen] = React.useState(false);
    const navigate = useNavigate();

    const clickCallback = (data) => {
        if (data.id !== undefined) {
            navigate('/location/' + data.id);
            apiLocation.get(data.id).then((res, error) => {
                    setLocationDetails(res.data);
                },
            );
        }
    };

    const handleAddLocationClick = () => {
        navigate('/location/new');
    };

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
    
    const handleDeviceUpdateModalOpen = () => {
        setIdentificationDeviceUpdateModalOpen(true);
    }
    useEffect(() => {
        if (params.id != null || params.id !== {} || params.id !== undefined) {
            clickCallback({id: params.id});
        }

        apiLocation.getAll().then((res, err) => {
            setLocationList(res.data.map((x) => {
                return {id: x.id, value: x.name};
            }));
        });
    }, []);

    return (
        <React.Fragment>
            <main>
                <Grid container height={'93vh'}>
                    <Grid
                        item md={4} lg={2}
                        sx={{borderRight: 1}} height={'93vh'}
                        display="flex"
                        flexDirection={'column'}
                        justifyContent="top|center"
                        alignItems="center">
                        <Typography variant="h6">
                            Location
                        </Typography>

                        <ListComponent listData={locationList} callback={clickCallback} divide={true}/>
                        <Button onClick={handleAddLocationClick}>Add location</Button>

                    </Grid>
                    <Grid item xs={4}
                          sx={{borderRight: 1}}>
                        <Box p={2}>
                            {
                                locationDetails != null && (
                                    <div>
                                        <p>id: {locationDetails.id}</p>
                                        <p>name: {locationDetails.name}</p>
                                        <p>presentation devices: {locationDetails.presentationDevices != null ? locationDetails.presentationDevices.map((x) => x.id).
                                        toString() : "No presentation devices currently set"}</p>
                                        <p>products: {locationDetails.product != null &&
                                        locationDetails.product.productNo
                                            ? locationDetails.product.productNo
                                            : 'No product currently set'},
                                            tags: {locationDetails.product != null && locationDetails.product.tags !=
                                            null
                                                ? locationDetails.product.tags.map((x) => x.tag).toString()
                                                : 'N/A'}
                                        </p>
                                        <p>devices: {locationDetails.identificationDevices != null ? locationDetails.identificationDevices.map((x) => x.companyId + " - " + x.deviceId + " - " + x.deviceType) : "No identification devices currently set"}</p>
                                        <Button onClick={() => removeLocationClick(locationDetails)}>Remove
                                            location</Button>
                                    </div>
                                )}
                        </Box>
                    </Grid>
                    <Grid item xs={4}
                          sx={{borderRight: 1}}>
                        <Box p={2}>
                            <Button onClick={handleDeviceUpdateModalOpen}>Set Identification Devices</Button>
                            <Button>Set presentation</Button>
                            <Button>Set product</Button>
                        </Box>
                        <LocationDeviceUpdateComponent callback={clickCallback} open={identificationDeviceUpdateModalOpen} setOpen={setIdentificationDeviceUpdateModalOpen}/>
                        
                    </Grid>
                </Grid>

            </main>
        </React.Fragment>
    );
}

export default LocationPage;
