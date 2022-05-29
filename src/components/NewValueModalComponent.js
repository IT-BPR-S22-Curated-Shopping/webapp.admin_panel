import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import {useState} from "react";

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

function NewValueModalComponent(props) {

    const [inputValue, setInputValue] = useState('');

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

    const handleConfirm = () => {
        props.confirm(inputValue)
        setInputValue('')
    }

    const handleCancel = () => {
        setInputValue('')
        props.cancel()
    }

    const handleInputChange = (value) => {
        setInputValue(value);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={handleCancel}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={style} display={'flex'}  flexDirection={'column'} alignItems={'center'} >
                    {text()}

                    <TextField
                        sx={{margin: 1}}
                        value={inputValue}
                        label={props.helper}
                        variant="standard"
                        onChange={(e)=>{ handleInputChange(e.target.value)}}
                    />

                    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{marginTop: 1}}>
                        <Button onClick={handleConfirm}>Confirm</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ButtonGroup>
                </Box>
            </Fade>
        </Modal>
    );
}

export default NewValueModalComponent;