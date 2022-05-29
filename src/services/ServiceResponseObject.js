

export const ServiceResponseObject = (status, payload) => {
    return {
        state: status,
        data: payload
    }
}