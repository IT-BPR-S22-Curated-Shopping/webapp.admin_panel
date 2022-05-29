import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

function WarningModalComponent(props) {

    const text = () => {
        const [mainText, subText] = props.message.split('\n');
        return (<Box>
                    <Typography component="h3" variant="h5">
                        {mainText}
                    </Typography>
                    <Typography variant="subtitle1">{subText}</Typography>
            </Box>
        );
    };

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
                    {text()}
                    <ErrorOutlineIcon fontSize={'large'} color={'warning'} sx={{margin: 1}}/>
                    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop: 1}}>
                        <Button onClick={props.confirm}>Confirm</Button>
                        <Button onClick={props.cancel}>Cancel</Button>
                    </ButtonGroup>
                </Box>
            </Fade>
        </Modal>
    );
}

export default WarningModalComponent;