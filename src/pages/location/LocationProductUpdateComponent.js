import {useParams} from "react-router-dom";
import * as React from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";


function LocationProductUpdateComponent(props) {
    const params = useParams();
    const apiLocation = props.locationApi;
    const apiProduct = props.productApi;
    const [productList, setProductList] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleProductUpdateChange = (event) => {
        setSelectedProduct(event.target.value);
    }

    const handleProductUpdateSave = (newProduct) => {
        if (params.id !== undefined) {
            apiLocation.updateProduct(params.id, newProduct).then(() => {
                props.callback(params)
            });
        }
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.open === true) {
            setSelectedProduct('');
            apiProduct.getAll().then(res => {
                setProductList(res.data);
            })
            handleModalOpen()
        }
    }, [props.open])

    return (
        <React.Fragment>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', bgcolor: 'background.paper'}}>
                    <Typography id="modal-title" variant="h6" align="center">
                        Select product
                    </Typography>
                    <FormControl variant="standard" sx={{width: '100%', p: 1}}>
                        <InputLabel id="select-product" sx={{pl: 1}}>Products</InputLabel>
                        <Select
                            value={selectedProduct}
                            onChange={handleProductUpdateChange}
                        >
                            {productList.map(product => (
                                <MenuItem
                                    key={product.id}
                                    value={product}
                                >
                                    {product.id} - {product.number} - {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Grid container justifyContent={'space-around'} mt={2} mb={1}>
                        <Button size="medium" onClick={() => handleProductUpdateSave(selectedProduct)}> Save </Button>
                        <Button size="medium" onClick={handleModalClose}>Cancel</Button>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default LocationProductUpdateComponent;