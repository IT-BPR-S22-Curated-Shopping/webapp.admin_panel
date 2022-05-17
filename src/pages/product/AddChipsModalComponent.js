import * as React from 'react';
import {Box, Button, Chip, Grid, Modal, TextField, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {AddCircleOutlineOutlined} from '@mui/icons-material';
import TagService from '../../services/TagService';
import ProductService from '../../services/ProductService';

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

function AddChipsModalComponent(props) {

    const tagApi = TagService.TagService();
    const productApi = ProductService.ProductService();

    const [open, setOpen] = React.useState(false);
    const [storedTags, setStoredTags] = useState([]);
    const [chips, setChips] = useState([]);
    const [tagInput, setTagInput] = useState('');


    useEffect(() => {
        tagApi.getAll().then((res, error) => {
            setStoredTags(res.data)
        })
    }, [])

    useEffect(() => {
    }, [props.callback])


    useEffect(() => {
        tagApi.getAll().then((res, error) => {
            setStoredTags(res.data)
        })
        setChips(props.product.tags)
        setTagInput(props.product.tags.map((t) => {return t.tag}).join(' '))
    }, [props.product])

    useEffect(() => {
        let chipArr = separateTags(tagInput);
        chipArr = chipArr.map((c) => {
            return {tag: c, exists: (storedTags.map((st) => st.tag).indexOf(c) > -1)};
        });
        setChips(chipArr);
    }, [tagInput]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeTags = (event) => {
        setTagInput(event.target.value);
    };
    const onSaveClick = () => {
        productApi.updateTags(props.product.id, chips.map((c) => c.tag)).then((res, err) => {
            if (res.data) {
                props.callback();
            }
        })
        handleClose()
    }

    const onChipDeleteClick = (value) => {
        let regex = new RegExp('\\b' + value + '\\b', 'g');
        setTagInput(tagInput.replace(regex, '').replace('  ', ' '));

        let chipIndex = chips.findIndex(c => c.tag === value);
        delete chips[chipIndex];
        setChips([]);
        setChips(chips);
    };

    function validateInput(e) {
        if (e.key === 'Enter')
        {
            e.preventDefault()
        }

        if (!e.key.match(/^[\sa-zA-Z0-9\-\_]*$/)) {
            e.preventDefault();
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const separateTags = (string) => {
        let chips = string.split(' ').filter(c => c);
        return chips.filter(onlyUnique);
    };

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <AddCircleOutlineOutlined onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} m={2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Product tags
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Type in tags to create and edit tags. When finished press save.
                    </Typography>
                    <Grid flexDirection={'column'}>
                        <Grid item>
                            {chips.length > 0 && chips.map((c) => {
                                return <Chip key={c.tag} label={c.tag} variant="outlined"
                                             onDelete={() => onChipDeleteClick(c.tag)}
                                             color={c.exists ? 'success' : 'default'}/>;
                            })}
                        </Grid>
                        <Grid item>
                            <TextField sx={{mt: 3, mb: 1, width:'100%'}} id="standard-basic" label="Associate tags" variant="standard"
                                       multiline
                                       style={{textAlign: 'left'}}
                                       value={tagInput} onChange={handleChangeTags} onKeyDown={validateInput}/>
                        </Grid>
                        <Grid item >
                            <Grid container flexDirection={'row'} justifyContent={'space-around'}>
                                <Button onClick={onSaveClick}>Save</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </Box>
    );
}

export default AddChipsModalComponent;