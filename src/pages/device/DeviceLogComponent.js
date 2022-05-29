import * as React from 'react';
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText, Typography,
} from '@mui/material';
import {useEffect} from 'react';
import Divider from '@mui/material/Divider';

function DeviceLogComponent(props) {

    const [log, setLog] = React.useState([]);

    useEffect(() => {
        if (props.log != null) {
            setLog(props.log);
        } else {
            setLog([{msg: "No log found"}])
        }
    }, [props.log])

    return (
        <Box>
            <Divider/>
            <Grid >
                <Grid>
                    <Typography variant="h6" textAlign={"center"}>
                        Device log
                    </Typography>
                    <List dense={true}>
                        {log.map(x => (
                            <ListItem
                                key={log.indexOf(x)}
                                divider={true}
                            >
                                <ListItemText
                                    primary={x.msg}
                                />

                            </ListItem>

                        ))}
                    </List>

                </Grid>
            </Grid>
        </Box>
    );
}

export default DeviceLogComponent;