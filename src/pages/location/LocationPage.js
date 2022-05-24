import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import {Box, Button, Grid, IconButton, Link, Tooltip} from '@mui/material';
import ServiceResponseEnum from '../../util/ServiceResponseEnum';
import {useNavigate, useParams} from 'react-router-dom';
import ListComponent from '../../components/ListComponent';
import LocationDeviceUpdateComponent from "./LocationDeviceUpdateComponent";
import LocationProductUpdateComponent from "./LocationProductUpdateComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Chip from '@mui/material/Chip';
import Card from "@mui/material/Card";
import {currentMillis, getJanFirst2022, isBeforeJanFirst2022} from "../../util/timestampConverter";
import AnalysisComponent from "../../components/AnalysisComponent";
import IdDeviceTypeComponent from "../../components/IdDeviceTypeComponent";

function LocationPage(props) {
    const params = useParams();
    const locationApi = props.locationService;
    const productApi = props.productService;
    const deviceApi = props.deviceService;
    const [locationList, setLocationList] = React.useState([]);
    const [locationDetails, setLocationDetails] = React.useState();
    const [identificationDeviceUpdateModalOpen, setIdentificationDeviceUpdateModalOpen] = React.useState(false);
    const [productUpdateModalOpen, setProductUpdateModalOpen] = React.useState(false);
    const navigate = useNavigate();
    const [locationAnalysis, setLocationAnalysis] = React.useState(null);

    const clickCallback = (data) => {
        if (data.id !== undefined) {
            navigate('/location/' + data.id);
            locationApi.get(data.id).then((res, error) => {
                    setLocationDetails(res.data);
                },
            );
        }
    };

    const handleAddLocationClick = () => {
        navigate('/location/new');
    };

    const removeLocationClick = () => {
        const location = locationDetails //TODO: added JN removed from params
        locationApi.removeLocation(location.id).then((res) => {
            if (res.state === ServiceResponseEnum.SUCCESS) {
                let index = locationList.findIndex(x => x.id === location.id);
                if (index > -1) {
                    setLocationList([
                        ...locationList.slice(0, index),
                        ...locationList.slice(index + 1, locationList.length),
                    ]);
                    setLocationDetails(null);
                } else {
                    // something went wrong
                    console.log('could not find item in list');
                }
            }
        });
    };
    
    const handleDeviceUpdateModalOpen = () => {
        setIdentificationDeviceUpdateModalOpen(true);
    }

    const handleProductUpdateModalOpen = () => {
        setProductUpdateModalOpen(true);
    }

    useEffect(() => {
        if (params.id != null || params.id !== {} || params.id !== undefined) {
            clickCallback({id: params.id});
        }

        locationApi?.getAll().then((res, err) => {
            setLocationList(res.data.map((x) => {
                return {id: x.id, value: x.name};
            }));
        });
    }, []);

    useEffect(() => {
        getAnalysis(currentMillis() - 3600000);
    }, [locationDetails])

    const getAnalysis = (fromTimestamp) => {
        if (locationDetails != null)
            locationApi.getLocationAnalysis(locationDetails.id, fromTimestamp, currentMillis()).then((res, err) => setLocationAnalysis(res.data))
    }

    const updateAnalysis = (fromTimestamp) => {
        if (isBeforeJanFirst2022(fromTimestamp)) {
            fromTimestamp = getJanFirst2022()
        }
        getAnalysis(fromTimestamp)
    }

    const getPresentationLink = () => `https://curatedshopping.netlify.app/presentation/${locationDetails.id}`

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
                            Location
                        </Typography>

                        <ListComponent listData={locationList} callback={clickCallback} divide={true}/>
                        <Button onClick={handleAddLocationClick}>Add location</Button>
                    </Grid>
                    {locationDetails != null && (
                        <Grid item xs={8} >
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, padding: 1 }}
                                    image={locationDetails.product && locationDetails.product.image ? locationDetails.product.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Media_Viewer_Icon_-_Location.svg/1200px-Media_Viewer_Icon_-_Location.svg.png'}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Typography component="div" variant="h5" mr={1}>
                                                {locationDetails.name}
                                            </Typography>
                                            <IconButton aria-label="delete" onClick={removeLocationClick} >
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                            {locationDetails.product && locationDetails.product.name ?
                                                <Box>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                        {locationDetails.product.name}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                        <Link href={getPresentationLink()}>https://curatedshopping.netlify.app/presentation/{locationDetails.id}</Link>
                                                     </Typography>
                                                </Box>
                                                :
                                                <IconButton onClick={handleProductUpdateModalOpen}>
                                                    <Tooltip title={'Add product to location'}>
                                                         <AddCircleOutlineIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            }
                                    </CardContent>
                                    <Box margin={1}>
                                        {locationDetails.identificationDevices && locationDetails.identificationDevices.length > 0 ?
                                            locationDetails.identificationDevices.map((d) => {
                                                return <Chip
                                                    key={d.deviceId}
                                                    sx={{padding:1}}
                                                    label={d.deviceId}
                                                    variant="outlined"
                                                    icon={<IdDeviceTypeComponent device={d} disableTooltip={true} size={20}/>} />;
                                            }) : ''}


                                        <IconButton onClick={handleDeviceUpdateModalOpen}>
                                            <Tooltip title={'Add identification device.'}>
                                                <AddCircleOutlineIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                    {/*<Box ml={2} mb={1}>*/}
                                    {/*    {productDetails.tags.length > 0 ?*/}
                                    {/*        productDetails.tags.map((c) => {*/}
                                    {/*            return <Chip key={c.tag} label={c.tag} variant="outlined"*/}
                                    {/*                         onDelete={() => onChipDeleteClick(c)}/>;*/}
                                    {/*        }) : ''}*/}
                                    {/*    <IconButton color="primary" aria-label="Add chip" component="span">*/}
                                    {/*        <AddChipsModalComponent productService={productApi}*/}
                                    {/*                                tagService={tagApi}*/}
                                    {/*                                product={productDetails}*/}
                                    {/*                                callback={addChipCallback}/>*/}
                                    {/*    </IconButton>*/}

                                    {/*</Box>*/}
                                </Box>
                            </Card>
                            {locationAnalysis != null && (<AnalysisComponent analysis={locationAnalysis} updateCallback={updateAnalysis}/>)}
                        </Grid>
                    )}

                    {/*</Grid>*/}
                    {/*{locationDetails != null && (*/}
                    {/*    <Grid item xs={4} sx={{borderRight: 1}}>*/}
                    {/*        <div>*/}
                    {/*            <p>id: {locationDetails.id}</p>*/}
                    {/*            <p>name: {locationDetails.name}</p>*/}
                    {/*            <p>presentation devices: {locationDetails.presentationDevices != null ? locationDetails.presentationDevices.map((x) => x.id).*/}
                    {/*            toString() : "No presentation devices currently set"}</p>*/}
                    {/*            <p>products: {locationDetails.product != null*/}
                    {/*                ? (locationDetails.product.number + " - " + locationDetails.product.name)*/}
                    {/*                : 'No product currently set'},*/}
                    {/*                tags: {locationDetails.product != null && locationDetails.product.tags !=*/}
                    {/*                null*/}
                    {/*                    ? locationDetails.product.tags.map((x) => x.tag).toString()*/}
                    {/*                    : 'N/A'}*/}
                    {/*            </p>*/}
                    {/*            <p>devices: {locationDetails.identificationDevices != null ? locationDetails.identificationDevices.map((x) => `[${x.companyId} - ${x.deviceId} - ${x.deviceType}] `) : "No identification devices currently set"}</p>*/}
                    {/*            <Button onClick={() => removeLocationClick(locationDetails)}>Remove*/}
                    {/*                location</Button>*/}
                    {/*        </div>*/}
                    {/*    </Grid>*/}
                    {/*    )}*/}
                    <LocationDeviceUpdateComponent locationApi={locationApi} deviceApi={deviceApi} callback={clickCallback}  open={identificationDeviceUpdateModalOpen} setOpen={setIdentificationDeviceUpdateModalOpen}/>
                    <LocationProductUpdateComponent locationApi={locationApi} productApi={productApi} callback={clickCallback} open={productUpdateModalOpen} setOpen={setProductUpdateModalOpen} />
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default LocationPage;
