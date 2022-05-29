import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, TextField} from '@mui/material';
import Typography from "@mui/material/Typography";
import SuccessModalComponent from "../../components/SuccessModalComponent";

function NewProductPage(props) {

    const productApi = props.productService;
    const tagApi = props.tagService;

    const [storedTags, setStoredTags] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [productNumber, setProductNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const [chips, setChips] = useState([]);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        tagApi.getAll().then((res, error) => {
            if (res) {
                setStoredTags(res.data);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let chipArr = separateTags(tagInput);
        chipArr = chipArr.map((c) => {
            return {tag: c, exists: (storedTags.map((st) => st.tag).indexOf(c) > -1)};
        });
        setChips(chipArr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagInput]);

    const handleChangeName = (event) => {
        clearErrorMsg()
        setName(event.target.value);
    };

    const handleProductImageChange = (event) => {
        clearErrorMsg()
        setImage(event.target.value);
    };

    const handleProductNumberChange = (event) => {
        clearErrorMsg()
        setProductNumber(event.target.value);
    };

    const handleChangeTags = (event) => {
        clearErrorMsg()
        setTagInput(event.target.value);
    };

    function validateInput(e) {
        if (!e.key.match(/^[\sa-zA-Z0-9\-_]*$/)) {
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

    const clearInput = () => {
        setName('');
        setTagInput('');
        setImage('');
        setProductNumber('');
        setChips([]);
        clearErrorMsg()
    };

    const clearErrorMsg = () => setErrorMsg('')

    const onChipDeleteClick = (value) => {
        let regex = new RegExp('\\b' + value + '\\b', 'g');
        setTagInput(tagInput.replace(regex, '').replace('  ', ' '));

        let chipIndex = chips.findIndex(c => c.tag === value);
        delete chips[chipIndex];
        setChips([]);
        setChips(chips);
    };

    const onSaveClick = () => {
        productApi.add({
            name: name,
            number: productNumber,
            image: image,
            tags: chips,
        }).then((res) => {
            if (res.data.hasOwnProperty('errorMsg')) {
                setErrorMsg(res.data.errorMsg.response.data)
            }
            else {
                setShowSuccess(true);
                clearInput();
            }
        });
    };

    const onClearClick = () => clearInput();

    const closeSuccess = () => setShowSuccess(false);

    return (
        <React.Fragment>
            <main>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={11} md={4} lg={3} mt={3}>
                        <Card>
                            <CardHeader
                                title="New Product"
                            >
                            </CardHeader>
                            <Typography variant="subtitle1" color="red" component="div" marginLeft={2}>
                                {errorMsg}
                            </Typography>
                            <CardContent>
                                <Grid container flexDirection={'column'}>
                                    <TextField sx={{m: 1}} id="standard-basic" label="Name" variant="standard"
                                               inputProps={{ "data-testid": "textField-product-name" }}
                                               value={name} onChange={handleChangeName} onKeyDown={validateInput}/>
                                    <TextField sx={{m: 1}} id="standard-basic" label="Product Number" variant="standard"
                                               inputProps={{ "data-testid": "textField-product-number" }}
                                               value={productNumber} onChange={handleProductNumberChange}/>
                                    <TextField sx={{m: 1}} id="standard-basic" label="Product Image" variant="standard"
                                               inputProps={{ "data-testid": "textField-product-image" }}
                                               value={image} onChange={handleProductImageChange}/>
                                    <Grid item>
                                        {chips.length > 0 && chips.map((c) => {
                                            return <Chip key={c.tag} label={c.tag} variant="outlined"
                                                         onDelete={() => onChipDeleteClick(c.tag)}
                                                         color={c.exists ? 'success' : 'default'}/>;
                                        })}
                                    </Grid>
                                    <TextField sx={{m: 1}} id="standard-basic" label="Associate tags" variant="standard"
                                               value={tagInput} onChange={handleChangeTags} onKeyDown={validateInput}/>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container justifyContent={'space-around'}>
                                    <Button size="small" onClick={onSaveClick}>Create</Button>
                                    <Button size="small" onClick={onClearClick}>Clear</Button>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                    <SuccessModalComponent open={showSuccess} close={closeSuccess} message={`Product ${name} successfully created`}/>
                </Grid>
            </main>
        </React.Fragment>
    );

}

export default NewProductPage;