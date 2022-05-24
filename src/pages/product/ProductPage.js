import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Chip, Grid, IconButton} from '@mui/material';
import ListComponent from '../../components/ListComponent';
import {useNavigate} from 'react-router-dom';
import AddChipsModalComponent from './AddChipsModalComponent';
import DeleteChipModalComponent from './DeleteChipModalComponent';
import AnalysisComponent from "../../components/AnalysisComponent";
import {currentMillis, getJanFirst2022, isBeforeJanFirst2022} from "../../util/timestampConverter";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";

function ProductPage(props) {

    const productApi = props.productService;
    const tagApi = props.tagService;

    const [productList, setProductList] = React.useState([]);
    const [productDetails, setProductDetails] = React.useState(null);
    const [selectedChip, setSelectedChip] = React.useState(null);
    const [openDeleteChipModal, setOpenDeleteChipModal] = React.useState(false);
    const navigate = useNavigate();
    const [productAnalysis, setProductAnalysis] = React.useState(null);

    const listItemClickCallback = (data) => {
        productApi?.get(data.id).then((res, error) => {
                setProductDetails(res.data);
            },
        );
    };

    useEffect(() => {
        productApi?.getAll().then((res, err) => {
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
        productApi?.get(productDetails.id).then((res, error) => {
                setProductDetails(res.data);
            },
        );
    };

    const addChipCallback = () => {
        updateProductDetails();
        setOpenDeleteChipModal(false);
        setSelectedChip(null);
    };

    useEffect(() => {
        getAnalysis(currentMillis() - 3600000);
    }, [productDetails])

    const getAnalysis = (fromTimestamp) => {
        if (productDetails != null)
            productApi.getProductAnalysis(productDetails.id, fromTimestamp, currentMillis()).then((res, err) => setProductAnalysis(res.data))
    }

    const updateAnalysis = (fromTimestamp) => {
        if (isBeforeJanFirst2022(fromTimestamp)) {
            fromTimestamp = getJanFirst2022()
        }
        getAnalysis(fromTimestamp)
    }

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
                    {productDetails != null && (
                        <Grid item xs={8}>
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, padding: 1}}
                                    image={productDetails.image ? productDetails.image : 'https://icon-library.com/images/icon-for-products/icon-for-products-7.jpg'}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {productDetails.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {productDetails.number}
                                        </Typography>
                                    </CardContent>
                                    <Box ml={2} mb={1}>
                                        {productDetails.tags.length > 0 ?
                                            productDetails.tags.map((c) => {
                                                return <Chip key={c.tag} label={c.tag} variant="outlined"
                                                             onDelete={() => onChipDeleteClick(c)}/>;
                                            }) : ''}
                                        <IconButton color="primary" aria-label="Add chip" component="span">
                                            <AddChipsModalComponent productService={productApi}
                                                                    tagService={tagApi}
                                                                    product={productDetails}
                                                                    callback={addChipCallback}/>
                                        </IconButton>

                                    </Box>
                                </Box>
                            </Card>
                            {productAnalysis != null && (<AnalysisComponent analysis={productAnalysis} updateCallback={updateAnalysis}/>)}
                        </Grid>
                    )}
                </Grid>
                <DeleteChipModalComponent tagService={tagApi}
                                          product={productDetails} chip={selectedChip}
                                          open={openDeleteChipModal} setOpen={setOpenDeleteChipModal}
                                          callback={updateProductDetails}/>
            </main>
        </React.Fragment>
    );
}

export default ProductPage;
