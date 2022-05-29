import {dateStringFromMillis} from "./timestampConverter";

export const deviceState = {
    offline: 'Offline',
    online: 'Online',
    ready: 'Ready',
    active: 'Active'
}

const stateContainer = (s, t) => ({
    state: s,
    timestamp: t,
    stateChange: dateStringFromMillis(t)
})

export const getDeviceState = (device) => {
    const isOffLine = () => device.timestampOffline > device.timestampOnline
    const isOnline = () => device.timestampOffline < device.timestampOnline && device.timestampOnline >= device.timestampReady && device.timestampOnline >= device.timestampActive
    const isReady = () => device.timestampOffline < device.timestampReady  && device.timestampOnline <= device.timestampReady && device.timestampReady > device.timestampActive
    const isActive = () => device.timestampOffline < device.timestampActive && device.timestampOnline < device.timestampActive && device.timestampReady <= device.timestampActive

    if(isOffLine()) {
        return stateContainer(deviceState.offline, device.timestampOffline)
    }
    else if (isOnline()) {
        return stateContainer(deviceState.online, device.timestampOnline)
    }
    else if (isReady()) {
        return stateContainer(deviceState.ready, device.timestampReady)
    }
    else if (isActive()) {
        return stateContainer(deviceState.active, device.timestampActive)
    } else {
        return 'Unknown'
    }
}