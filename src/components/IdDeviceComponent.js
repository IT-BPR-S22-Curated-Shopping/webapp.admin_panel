import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IdDeviceTypeComponent from "./IdDeviceTypeComponent";
import {getDeviceState} from "../util/deviceStateUtil";

function IdDeviceComponent(props) {
    const currentState = getDeviceState(props.device)

    const getDeviceType = () => {
        switch (props.device.deviceType) {
            case 'BLE':
                return 'Bluetooth Beacon Scanner'
            case 'CV':
                return 'Camera'
            default:
                return 'Unknown 3-party device'
        }
    }

    return (
        <Card sx={{ display: 'flex'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:2}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', mb: 1}}>
                        <IdDeviceTypeComponent device={props.device} disableTooltip={true}/>
                        <Typography component="div" variant="h5" ml={1}>
                            {getDeviceType()}
                        </Typography>

                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.device.deviceId}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {currentState.state} since {currentState.stateChange}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}

export default IdDeviceComponent
