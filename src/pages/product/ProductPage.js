import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Grid} from '@mui/material';
import ListComponent from '../../components/ListComponent';
import ProductService from '../../services/ProductService';
import {useNavigate} from 'react-router-dom';

function Product() {

    const api = ProductService.ProductService();

    const [productList, setProductList] = React.useState([]);
    const [productDetails, setProductDetails] = React.useState(null);

    const navigate = useNavigate();

    const listItemClickCallback = (data) => {
        api.get(data.id).then((res, error) => {
                console.log(res.data);
                setProductDetails(res.data);
            },
        );
    };

    useEffect(() => {
        api.getAll().then((res, err) => {
            setProductList(res.data.map( (x) => {
                return {id: x.id, value: x.name}
            }));
        });
    }, []);

    const onAddClick = () => {
        navigate('/product/new')
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
                        <Button variant={'outlined'} onClick={onAddClick}>Add Product</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Box p={2}>
                            {
                                productDetails != null && (
                                    <div>
                                        <p>details</p>
                                        <p>Name: {productDetails.name}</p>
                                        <p>Tags: {JSON.stringify(productDetails.tags)}</p>
                                    </div>
                                )}
                        </Box>
                    </Grid>

                </Grid>
            </main>
        </React.Fragment>
    );
}

export default Product;
