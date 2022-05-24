export const dateStringFromMillis = (millis) => new Date(millis).toLocaleString()
export const hhMMssFromMillis = (millis) => new Date(millis).toISOString().substring(11, 19)
export const MMssFromMillis = (millis) => new Date(millis).toISOString().substring(14, 19)
export const currentMillis = () => Date.now()
export const isBeforeJanFirst2022 = (millis) => millis < 1640995200000
export const getJanFirst2022 = () => 1640995200000
export const minuteFromMillis = (millis) => new Date(millis).getMinutes()
export const hourFromMillis = (millis) => new Date(millis).getHours()
export const dayFromMillis = (millis) => new Date(millis).getDay()
export const getWeekNumberFromMillis = (millis) => {
    const currentDate = new Date(millis);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
}
export const monthFromMillis  = (millis) => new Date(millis).getMonth()