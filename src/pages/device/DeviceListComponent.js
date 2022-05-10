import * as React from 'react';
import {
    Avatar, Box, Grid, IconButton,
    List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import {styled} from '@mui/styles';
import {BluetoothSearching, ToggleOn, ToggleOff} from '@mui/icons-material';




function DeviceListComponent() {

    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(true);
    const [deviceList, setDeviceList] = React.useState( [
        {deviceName: "Device 1", deviceId: "6d37f0b8-084c-4bf5-87eb-893e6f7ccb50"},
        {deviceName: "Device 2", deviceId: "170d9e8b-1f57-4ffb-aae0-01338dce089b"},
        {deviceName: "Device 3", deviceId: "97a0d5f2-e5ac-45cd-bbf0-6e3252eb2484"},
        {deviceName: "Device 4", deviceId: "acafcc8a-447c-427c-a13b-62e8c2f3c21e"}
    ])
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return(
        <div>
        <Box >
            <Grid container spacing={2}>
                <Grid >
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" >
                        Devices
                    </Typography>

                        <List dense={dense}>
                            {deviceList.map(x => (
                                <ListItemButton
                                    key={x.deviceId}
                                    selected={selectedIndex === deviceList.indexOf(x)}
                                    onClick={(event) => handleListItemClick(event, deviceList.indexOf(x))}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <BluetoothSearching />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={x.deviceName}
                                        secondary={secondary ? 'ID: ' + x.deviceId : null}
                                    />
                                    <IconButton edge="end" aria-label="delete">
                                        <ToggleOn color={"success"}/>
                                    </IconButton>
                                </ListItemButton>))
                            }
                        </List>

                </Grid>
            </Grid>
        </Box>
        </div>
    )
}

export default DeviceListComponent;