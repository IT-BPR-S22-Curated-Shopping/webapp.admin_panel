import {BluetoothSearching, DeviceUnknown} from "@mui/icons-material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import * as React from "react";
import {Avatar, Tooltip} from "@mui/material";
import { deviceState, getDeviceState } from "../util/deviceStateUtil";

function idDeviceTypeComponent(props) {

    const device = props.device
    const currentState = getDeviceState(device)

    const returnDeviceStateColor = () => {
        switch (currentState.state) {
            case deviceState.offline:
                return ''
            case deviceState.online:
                return 'orange'
            case deviceState.ready:
                return 'yellow'
            case deviceState.active:
                return 'green'
            default:
                return 'Red'
        }
    }

    const returnStateTooltip = () => {
        switch (currentState.state) {
            case deviceState.offline:
                return 'Offline since ' + currentState.stateChange
            case deviceState.online:
                return 'Online since ' +  currentState.stateChange
            case deviceState.ready:
                return 'Ready since ' +  currentState.stateChange
            case deviceState.active:
                return 'Active since ' + currentState.stateChange
            default:
                return 'Unknown state'
        }
    }


    const setIcon = () => {
        switch (device.deviceType) {
            case "BLE":
                return <BluetoothSearching sx={{
                height: props.size - 2, width: props.size - 2
                }}/>
            case "CV":
                return <VideoCameraFrontIcon sx={{
                height: props.size - 2, width: props.size - 2
            }}/>
            default:
                return <DeviceUnknown sx={{
                    height: props.size - 2, width: props.size - 2
                }}/>
        }
    }

    return (
        <Tooltip title={returnStateTooltip()} disableHoverListener={props.disableTooltip}>
            <Avatar sx={{
                height: props.size,
                width: props.size,
                bgcolor: returnDeviceStateColor()
            }} >
                {
                    setIcon()
                }
            </Avatar>
        </Tooltip>
    )
}

export default idDeviceTypeComponent;