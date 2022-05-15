import * as React from 'react';
import {
    Box, Grid, List, ListItemButton,
    ListItemText,
} from '@mui/material';
import {useEffect} from 'react';
import Divider from '@mui/material/Divider';

function LocationListComponent(props) {

    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(true);
    const [locationList, setLocationList] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.callback(locationList[index]);
    };

    useEffect(() => {
        setLocationList(props.listData);
    }, [props.listData]);

    return (
            <Box>
                <Divider/>
                <Grid>
                    <Grid>
                        <List dense={dense}>
                            {locationList?.length > 0 && locationList.map(x => (
                                <ListItemButton
                                    key={x.id}
                                    selected={selectedIndex === locationList.indexOf(x)}
                                    onClick={(event) => handleListItemClick(event, locationList.indexOf(x))}
                                >
                                    <ListItemText
                                        primary={x.name}
                                    />
                                </ListItemButton>))
                            }
                        </List>

                    </Grid>
                </Grid>
            </Box>
    );
}

export default LocationListComponent;