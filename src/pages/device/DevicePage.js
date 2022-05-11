import * as React from 'react';
import DeviceListComponent from './DeviceListComponent';
import {Button, Grid, Typography} from '@mui/material';
import DeviceService from '../../services/DeviceService';
import {useEffect} from 'react';
import DeviceLogComponent from './DeviceLogComponent';

function DevicePage() {
    const api = DeviceService.DeviceServiceMock();
    const [deviceList, setDeviceList] = React.useState([]);
    const [deviceDetails, setDeviceDetails] = React.useState(null);

    const deviceClickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                setDeviceDetails(res.data.deviceLog);
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
                        sx={{borderRight: 1}} height={'92vh'}
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
                    <Grid item xs={5} md={4} sx={{borderRight: 1}}>
                        {
                            deviceDetails != null && (
                                <div>
                                    <Button variant="contained" sx={{m: 1}} color={'success'}>ONLINE</Button>
                                    <Button variant="contained" sx={{m:1}} color={'error'}>Deactivate</Button>
                                    <DeviceLogComponent log={deviceDetails}/>
                                </div>

                            )

                        }

                    </Grid>
                    <Grid item xs={5} md={4}>

                    </Grid>
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default DevicePage;
