import * as React from 'react';
import DeviceListComponent from './DeviceListComponent';
import IdDeviceComponent from "../../components/IdDeviceComponent";
import {Button, Grid, IconButton, Typography} from '@mui/material';
import {useEffect} from 'react';
import AnalysisComponent from "../../components/AnalysisComponent";
import {currentMillis, getJanFirst2022, isBeforeJanFirst2022} from "../../util/timestampConverter";

function DevicePage(props) {
    const api = props.deviceService;

    const [deviceList, setDeviceList] = React.useState([]);
    const [deviceDetails, setDeviceDetails] = React.useState(null);
    const [deviceAnalysis, setDeviceAnalysis] = React.useState(null);

    const deviceClickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                setDeviceDetails(res.data);
            },
        );
    };

    const updateAnalysis = (fromTimestamp) => {
        if (isBeforeJanFirst2022(fromTimestamp)) {
            fromTimestamp = getJanFirst2022()
        }
        getAnalysis(fromTimestamp)
    }

    useEffect(() => {
        api.getAll().then((res, err) => {
            setDeviceList(res.data);
        });
    }, []);

    useEffect(() => {
        getAnalysis(currentMillis() - 3600000);
    }, [deviceDetails])

    const getAnalysis = (fromTimestamp) => {
        if (deviceDetails != null)
            api.getDeviceAnalysis(deviceDetails.deviceId, fromTimestamp, currentMillis()).then((res, err) => setDeviceAnalysis(res.data));
    }

    return (
        <React.Fragment>
            <main>
                <Grid container>
                    <Grid
                        item md={5} lg={2}
                        sx={{borderRight: 1}} height={'93vh'}
                        display="flex"
                        flexDirection={'column'}
                        justifyContent="top|center"
                        alignItems="center">
                        <Typography variant="h6">
                            Devices
                        </Typography>
                        <DeviceListComponent listData={deviceList} callback={deviceClickCallback}/>
                        <Typography variant="subtitle1" color="text.secondary" component="div" marginTop={1}>
                            Devices will appear as they come online
                        </Typography>
                    </Grid>
                    {deviceDetails != null && (
                        <Grid item md={7} lg={8} sx={{borderRight: 1}}>
                            <IdDeviceComponent device={deviceDetails}/>
                            {deviceAnalysis != null && (<AnalysisComponent analysis={deviceAnalysis} updateCallback={updateAnalysis}/>)}
                        </Grid>
                    )}
                    <Grid/>
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default DevicePage;
