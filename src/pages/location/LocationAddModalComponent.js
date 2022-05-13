import {Backdrop, Box, Button, Fade, Modal, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';

function LocationAddModalComponent(props) {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    let locationNameRef = useRef('');
    const handleCloseModal = () => props.set(false);
    const handleOnButtonClick = () => {
        props.set(false);
        props.callback(locationNameRef.current.value);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.get}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.get}>
                <Box sx={modalStyle} flexDirection={'column'} display={'flex'}>

                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Create new location
                    </Typography>
                    <TextField
                        required
                        id="filled"
                        label="Location name"
                        defaultValue=""
                        variant="filled"
                        inputRef={locationNameRef}
                    />
                    <Button sx={{mt: 2}} onClick={handleOnButtonClick}>Save</Button>
                </Box>
            </Fade>
        </Modal>
    );
}

export default LocationAddModalComponent;