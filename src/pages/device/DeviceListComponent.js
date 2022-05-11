import * as React from 'react';
import {
    Avatar, Box, Grid, IconButton,
    List, ListItemAvatar, ListItemButton,
    ListItemText,
} from '@mui/material';
import {BluetoothSearching, ToggleOn, ToggleOff} from '@mui/icons-material';
import {useEffect} from 'react';

function DeviceListComponent(props) {

    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(true);
    const [deviceList, setDeviceList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.callback(deviceList[index]);
    };

    useEffect(() => {
        setDeviceList(props.listData);
    }, [props.listData]);

    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    <Grid>
                        <List dense={dense}>
                            {deviceList.map(x => (
                                <ListItemButton
                                    key={x.deviceId}
                                    selected={selectedIndex === deviceList.indexOf(x)}
                                    onClick={(event) => handleListItemClick(event, deviceList.indexOf(x))}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <BluetoothSearching/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={x.deviceName}
                                        secondary={secondary ? 'ID: ' + x.deviceId : null}
                                    />
                                    <IconButton edge="end" aria-label="delete">
                                        <ToggleOn color={'success'}/>
                                    </IconButton>
                                </ListItemButton>))
                            }
                        </List>

                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default DeviceListComponent;