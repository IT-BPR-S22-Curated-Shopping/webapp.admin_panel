import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';

const style = {
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

function SuccessModalComponent(props) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={style} display={'flex'}  flexDirection={'column'} alignItems={'center'} >
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {props.message}
                    </Typography>
                    <DoneIcon fontSize={'large'} color={'success'}/>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SuccessModalComponent;