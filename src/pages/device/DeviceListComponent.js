import * as React from 'react';
import {
    Grid,
    List, ListItemAvatar, ListItemButton,
    ListItemText
} from '@mui/material';
import {useEffect} from 'react';
import IdDeviceTypeComponent from "../../components/IdDeviceTypeComponent";

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
        <Grid container>
            <Grid item xs={12}>
                <List dense={dense}>
                    {deviceList.map(x => (
                        <ListItemButton
                            key={x.deviceId}
                            selected={selectedIndex === deviceList.indexOf(x)}
                            onClick={(event) => handleListItemClick(event, deviceList.indexOf(x))}
                        >
                            <ListItemAvatar>
                                <IdDeviceTypeComponent device={x} disableTooltip={false}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={x.companyId}
                                secondary={secondary ? 'ID: ' + x.deviceId : null}
                            />
                        </ListItemButton>))
                    }
                </List>

            </Grid>
        </Grid>
    );
}

export default DeviceListComponent;