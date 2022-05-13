import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Fade, Grid, Modal, Backdrop} from '@mui/material';

import LocationListComponent from './LocationListComponent';
import LocationService from '../../services/LocationService';
import LocationAddModalComponent from './LocationAddModalComponent';

function LocationPage() {

    const api = LocationService.LocationService();
    const [locationList, setLocationList] = React.useState([]);
    const [locationDetails, setLocationDetails] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);

    const clickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                setLocationDetails(res.data);
            },
        );
    };

    const modalCallback = (data) => {
        api.addLocation(data).then((res) => {
            setLocationList(locationList => [...locationList, res.data]);
        })
    }

    useEffect(() => {
        api.getAll().then((res, err) => {
            setLocationList(res.data);
        });
    }, []);

    return (
        <React.Fragment>
            <main>
                <Grid container>
                    <Grid
                        item md={4} lg={2}
                        sx={{borderRight: 1}} height={'92vh'}
                        display="flex"
                        flexDirection={'column'}
                        justifyContent="top"
                        alignItems="left">
                        <Typography variant="h6" textAlign={'center'}>
                            Locations
                        </Typography>

                        <LocationListComponent listData={locationList} callback={clickCallback}/>

                        <Button onClick={handleOpenModal}>Add location</Button>
                    </Grid>
                    <Grid item xs={5} md={4} m={2}>
                        {
                            locationDetails != null && (
                                <div>
                                    <p>id: {locationDetails.id}</p>
                                    <p>name: {locationDetails.name}</p>
                                    <p>presentation devices: {locationDetails.presentationDevices.map((x) => x.id).
                                        toString()}</p>
                                    <p>products: {locationDetails.product.productNo},
                                        tags: {locationDetails.product.tags.map((x) => x.tag).toString()}</p>
                                    <p>devices: {locationDetails.trackingDevices.map((x) => x.name).toString()}</p>
                                </div>

                            )

                        }

                    </Grid>
                </Grid>
                <LocationAddModalComponent get={openModal} set={setOpenModal} callback={modalCallback}/>
            </main>
        </React.Fragment>
    );
}

export default LocationPage;
