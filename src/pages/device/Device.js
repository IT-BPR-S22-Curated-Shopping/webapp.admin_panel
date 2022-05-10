import * as React from 'react';
import DeviceListComponent from './DeviceListComponent';
import {Container, Grid, Paper} from '@mui/material';
import {height} from '@mui/system';

function Device() {
    return (
        <React.Fragment>
            <main >
                <Grid container >
                    <Grid item xs={4} >
                        <DeviceListComponent/>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default Device;
