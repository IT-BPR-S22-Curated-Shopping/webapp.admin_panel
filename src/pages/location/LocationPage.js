import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
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
import WarningModalComponent from "../../components/WarningModalComponent";

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
    const [showDeleteLocationWarning, setShowDeleteLocationWarning] = useState(false)
    const [showRemoveProductWarning, setShowRemoveProductWarning] = useState(false)
    const [showRemoveDeviceWarning, setShowRemoveDeviceWarning] = useState(false)
    const [deviceToRemove, setDeviceToRemove] = useState('')

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
       setShowDeleteLocationWarning(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAnalysis(currentMillis() - 3600000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleWarningCancel = () => {
        setShowDeleteLocationWarning(false);
        setShowRemoveProductWarning(false);
        setShowRemoveDeviceWarning(false);
        setDeviceToRemove('')
    }

    const handleRemoveProduct = () => setShowRemoveProductWarning(true);

    const handleRemoveDevice = (deviceId) => {
        setDeviceToRemove(deviceId);
        setShowRemoveDeviceWarning(true)
    }

    const handleRemoveProductConfirm = () => {
        locationDetails.product = null
        locationApi.update(locationDetails)
            .then(res => {
                if (!res.data.hasOwnProperty('errorMsg')) {
                    setShowRemoveProductWarning(false);
                }
            })
    }

    const handleRemoveDeviceConfirm = () => {
        for(let i = 0; i < locationDetails.identificationDevices.length; i++) {
            if (locationDetails.identificationDevices[i].deviceId === deviceToRemove.trim()) {
                locationDetails.identificationDevices.splice(i, 1)
            }
        }
        locationApi.update(locationDetails)
            .then(res => {
                if (!res.data.hasOwnProperty('errorMsg')) {
                    setShowRemoveDeviceWarning(false);
                    setDeviceToRemove('')
                }
            })
    }

    const handleDeleteLocationConfirm = () => {
        locationApi.removeLocation(locationDetails.id).then((res) => {
            if (res.state === ServiceResponseEnum.SUCCESS) {
                let index = locationList.findIndex(x => x.id === locationDetails.id);
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
        setShowDeleteLocationWarning(false);
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
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -1, marginTop: -1}} >
                                                        <IconButton color='primary' onClick={handleRemoveProduct} disableRipple={true}>
                                                            <Tooltip title={`Remove ${locationDetails.product.name} from location`}>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    {locationDetails.product.name}
                                                                </Typography>
                                                            </Tooltip>
                                                        </IconButton>
                                                    </Box>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                                        <Link href={getPresentationLink()}>https://curatedshopping.netlify.app/presentation/{locationDetails.id}</Link>
                                                    </Typography>
                                                </Box>
                                                :
                                                <IconButton sx={{marginLeft: -1}} color="primary" onClick={handleProductUpdateModalOpen}>
                                                    <Tooltip title={'Add product to location'}>
                                                         <AddCircleOutlineIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            }
                                    </CardContent>
                                    <Box margin={1}>
                                        {locationDetails.identificationDevices && locationDetails.identificationDevices.length > 0 ?
                                            locationDetails.identificationDevices.map((d) => {
                                                return <IconButton sx={{marginLeft: -1}} color="primary" onClick={(e) => handleRemoveDevice(e.target.textContent)} disableRipple={true}>
                                                        <Tooltip key={d.deviceId} title={`Remove ${d.deviceId} from location`}>
                                                            <Chip
                                                                clickable={true}
                                                                sx={{padding:1, marginLeft: 1}}
                                                                label={d.deviceId}
                                                                variant="outlined"
                                                                icon={<IdDeviceTypeComponent device={d} disableTooltip={true} size={20}/>} />
                                                        </Tooltip>
                                                    </IconButton>
                                            }) : ''}
                                        <IconButton color="primary" onClick={handleDeviceUpdateModalOpen}>
                                            <Tooltip title={'Add identification device.'}>
                                                <AddCircleOutlineIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Card>
                            {locationAnalysis != null && (<AnalysisComponent analysis={locationAnalysis} updateCallback={updateAnalysis}/>)}
                        </Grid>
                    )}
                    <LocationDeviceUpdateComponent locationApi={locationApi} deviceApi={deviceApi} callback={clickCallback}  open={identificationDeviceUpdateModalOpen} setOpen={setIdentificationDeviceUpdateModalOpen} currentDevices={locationDetails?.identificationDevices}/>
                    <LocationProductUpdateComponent locationApi={locationApi} productApi={productApi} callback={clickCallback} open={productUpdateModalOpen} setOpen={setProductUpdateModalOpen} />
                    <WarningModalComponent message={`Delete location ${locationDetails?.name}? \nThis cannot be undone.`} open={showDeleteLocationWarning} cancel={handleWarningCancel} confirm={handleDeleteLocationConfirm}/>
                    <WarningModalComponent message={`Remove product ${locationDetails?.product?.name} from location ${locationDetails?.name}?`} open={showRemoveProductWarning} cancel={handleWarningCancel} confirm={handleRemoveProductConfirm}/>
                    <WarningModalComponent message={`Remove device ${deviceToRemove} from location ${locationDetails?.name}?`} open={showRemoveDeviceWarning} cancel={handleWarningCancel} confirm={handleRemoveDeviceConfirm}/>
                </Grid>
            </main>
        </React.Fragment>
    );
}

export default LocationPage;