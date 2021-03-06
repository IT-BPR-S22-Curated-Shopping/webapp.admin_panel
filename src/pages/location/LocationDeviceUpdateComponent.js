import {useParams} from "react-router-dom";
import * as React from "react";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";


function LocationDeviceUpdateComponent(props) {
    const currentDevices = props.currentDevices
    const params = useParams();
    const apiLocation = props.locationApi;
    const apiDevice = props.deviceApi;
    const [deviceList, setDeviceList] = React.useState([]);
    const [selectedDevices, setSelectedDevices] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleDeviceUpdateChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedDevices( typeof value === 'string' ? value.split(',') : value);
    }

    const handleDeviceUpdateSave = (newDevices) => {
        Array.prototype.push.apply(currentDevices, newDevices);
        if (params.id !== undefined) {
            apiLocation.updateDevices(params.id, currentDevices).then(res => {
                if (!res.data.hasOwnProperty('errorMsg')) {
                    props.callback(params)
                    setSelectedDevices([])
                    handleModalClose()
                }
                else {
                    setSelectedDevices(res.data.errorMsg.response.data)
                }
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
            setSelectedDevices([]);
            apiDevice.getAllAvailable().then(res => {
                setDeviceList(res.data);
            })
            handleModalOpen()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        Select identification devices
                    </Typography>
                    <FormControl variant="standard" sx={{width: '100%', p: 1}}>
                        <InputLabel id="select-device" sx={{pl: 1}}>Devices</InputLabel>
                        <Select
                            multiple
                            value={selectedDevices}
                            onChange={handleDeviceUpdateChange}
                        >
                            {deviceList.map(device => (
                                <MenuItem
                                    key={device.id}
                                    value={device}
                                >
                                    {device.companyId} - {device.deviceId} - {device.deviceType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Grid container justifyContent={'space-around'} mt={2} mb={1}>
                        <Button size="medium" onClick={() => handleDeviceUpdateSave(selectedDevices)}> Save </Button>
                        <Button size="medium" onClick={handleModalClose}>Cancel</Button>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default LocationDeviceUpdateComponent;