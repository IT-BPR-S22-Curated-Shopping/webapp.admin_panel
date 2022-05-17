import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Chip, Grid, IconButton} from '@mui/material';
import ListComponent from '../../components/ListComponent';
import ProductService from '../../services/ProductService';
import {useNavigate} from 'react-router-dom';
import AddChipsModalComponent from './AddChipsModalComponent';
import DeleteChipModalComponent from './DeleteChipModalComponent';

function ProductPage() {

    const api = ProductService.ProductService();

    const [productList, setProductList] = React.useState([]);
    const [productDetails, setProductDetails] = React.useState(null);
    const [selectedChip, setSelectedChip] = React.useState(null);
    const [openDeleteChipModal, setOpenDeleteChipModal] = React.useState(false);
    const navigate = useNavigate();

    const listItemClickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                setProductDetails(res.data);
            },
        );
    };

    useEffect(() => {
        api.getAll().then((res, err) => {
            setProductList(res.data.map((x) => {
                return {id: x.id, value: x.name};
            }));
        });
    }, []);

    const onAddProductClick = () => {
        navigate('/product/new');
    };

    const onChipDeleteClick = (chip) => {
        setSelectedChip(chip);
        setOpenDeleteChipModal(true);
    };

    const updateProductDetails = () => {
        api.get(productDetails.id).then((res, error) => {
                setProductDetails(res.data);
            },
        );
    };

    const addChipCallback = () => {
        updateProductDetails();
        setOpenDeleteChipModal(false);
        setSelectedChip(null);
    };

    return (
        <React.Fragment>
            <main>
                <Grid container height={'93vh'}>
                    <Grid
                        item md={4} lg={2}
                        sx={{borderRight: 1}} height={'93vh'}
                        display="flex"
                        flexDirection={'column'}
                        justifyContent="top|center"
                        alignItems="center">
                        <Typography variant="h6">
                            Product
                        </Typography>
                        <ListComponent listData={productList} callback={listItemClickCallback} divide={true}/>
                        <Button variant={'outlined'} onClick={onAddProductClick}>Add Product</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Box p={2}>
                            {
                                productDetails != null && (
                                    <div>
                                        <p>Details</p>
                                        <img src={productDetails.image} width={'200px'}/>
                                        <p>Name: {productDetails.name}</p>
                                        <p>productNo: {productDetails.productNo}</p>
                                        <Box>Tags: {productDetails.tags.length > 0 ?
                                            productDetails.tags.map((c) => {
                                                return <Chip key={c.tag} label={c.tag} variant="outlined"
                                                             onDelete={() => onChipDeleteClick(c)}/>;
                                            }) : ''}
                                            <IconButton color="primary" aria-label="Add chip" component="span">
                                                <AddChipsModalComponent product={productDetails}
                                                                        callback={addChipCallback}/>
                                            </IconButton>

                                        </Box>
                                    </div>
                                )
                            }

                        </Box>
                    </Grid>
                </Grid>
                <DeleteChipModalComponent product={productDetails} chip={selectedChip}
                                          open={openDeleteChipModal} setOpen={setOpenDeleteChipModal}
                                          callback={updateProductDetails}/>
            </main>
        </React.Fragment>
    );
}

export default ProductPage;
