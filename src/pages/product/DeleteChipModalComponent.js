import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect} from 'react';
import {Checkbox, FormControlLabel, Grid} from '@mui/material';

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

function DeleteChipModalComponent(props) {

    const tagApi = props.tagService;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.setOpen(false);
    };
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        if (props.open === true) {
            handleOpen();
        }
    }, [props.open]);

    const onCheckboxChanged = (e) => {
        setChecked(e.target.checked);
    };

    const onSaveClick = () => {
        if (checked) {
            tagApi.remove(props.chip?.id).then((res, error) => {
                props.callback();
                handleClose();
            });
        }
    };

    const onCancelClick = () => {
        props.setOpen(false);
        handleClose();
        setChecked(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete tag ({props.chip?.tag.toString()}) from system.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        By deleting the tag entirely from the system. The tag cannot be used anymore, and has to be
                        recreated to be usable.
                    </Typography>

                    <FormControlLabel sx={{m: 1}} control={
                        <Checkbox
                            data-testid={"confirm_checkbox"}
                            checked={checked}
                            onChange={onCheckboxChanged}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    } label="Confirm"/>
                    <Box sx={{m: 1}}>
                        {checked
                            ? <span style={{color: 'red'}}> I understand that removing a tag from system removes the tag from all other products.</span>
                            : ''}
                    </Box>
                    <Box>
                        <Grid container flexDirection={'row'} justifyContent={'space-around'}>
                            <Button onClick={onSaveClick}>Ok</Button>
                            <Button onClick={onCancelClick}>Cancel</Button>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteChipModalComponent;