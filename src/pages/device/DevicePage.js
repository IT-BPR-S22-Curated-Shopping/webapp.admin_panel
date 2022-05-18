import * as React from 'react';
import DeviceListComponent from './DeviceListComponent';
import {Button, Grid, IconButton, Typography} from '@mui/material';
import DeviceService from '../../services/DeviceService';
import {useEffect} from 'react';
import DeviceLogComponent from './DeviceLogComponent';
import LocationService from '../../services/LocationService';


function DevicePage() {
    const api = DeviceService.DeviceServiceMock();
    const locationApi = LocationService.LocationServiceMock();

    const [deviceList, setDeviceList] = React.useState([]);
    const [deviceDetails, setDeviceDetails] = React.useState(null);

    const deviceClickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                setDeviceDetails(res.data);
            },
        );
    };


    useEffect(() => {
        api.getAll().then((res, err) => {
            setDeviceList(res.data);
        });
    }, []);

    return (
        <React.Fragment>
            <main>
                <Grid container>
                    <Grid
                        item md={4} lg={2}
                        sx={{borderRight: 1}} height={'93vh'}
                        display="flex"
                        flexDirection={'column'}
                        justifyContent="top|center"
                        alignItems="center">
                        <Typography variant="h6">
                            Devices
                        </Typography>
                        <DeviceListComponent listData={deviceList} callback={deviceClickCallback}/>
                        <Button>Add device</Button>
                    </Grid>
                    {deviceDetails != null && (
                        <Grid item xs={5} md={4} sx={{borderRight: 1}}>
                            <div>
                                <Button variant="contained" sx={{m: 1}} color={'success'}>ONLINE</Button>
                                <Button variant="contained" sx={{m: 1}} color={'error'}>Deactivate</Button>
                                <DeviceLogComponent log={deviceDetails.deviceLog}/>
                            </div>
                        </Grid>
                    )}
                    {deviceDetails != null && (
                        <Grid item xs={5} md={4} pl={1} alignContent={'center'}>
                            <p>
                                details: {JSON.stringify(deviceDetails)}
                            </p>
                        </Grid>
                    )}
                    <Grid/>
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default DevicePage;
