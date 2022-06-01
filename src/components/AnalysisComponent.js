import * as React from 'react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart
} from '@devexpress/dx-react-chart-material-ui';
import Divider from "@mui/material/Divider";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import {
    currentMillis,
    dayFromMillis, monthFromMillis, getWeekNumberFromMillis,
    hhMMssFromMillis, hourFromMillis, minuteFromMillis,
    MMssFromMillis
} from "../util/timestampConverter";
import {Select, Tooltip, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useEffect} from "react";

import {
    LineSeries,
    Title
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
    curveCatmullRom,
    line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

function AnalysisComponent (props) {
    const oneHourMillis = 3600000;
    const oneDayMillis = 86400000;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const ranges = [
        {
            name: 'Last hour',
            value: oneHourMillis
        },
        {
            name: 'Last 24 hours',
            value: oneHourMillis * 24
        },
        {
            name: 'Last 7 days',
            value: oneHourMillis * 24 * 7
        },
        {
            name: 'Last 30 days',
            value: oneHourMillis * 24 * 30
        },
        {
            name: 'Last year',
            value: oneHourMillis * 24 * 365
        }
    ]
    const [range, setRange] = React.useState(ranges[0])
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [chartData, setChartData] = React.useState([])

    const getAvgMillis = () => {
        if (props.analysis.avgMillisConsumed > 3600000) {
            return hhMMssFromMillis(props.analysis.avgMillisConsumed)
        }
        else if (props.analysis.avgMillisConsumed > 0) {
            return MMssFromMillis(props.analysis.avgMillisConsumed)
        }
        else {
            return 0;
        }
    }

    const getAvgMillisTooltip = () => {
        if (props.analysis.avgMillisConsumed > oneHourMillis) {
            return 'Average time detected hh:mm:ss'
        }
        else if (props.analysis.avgMillisConsumed > 0) {
            return 'Average time detected mm:ss'
        }
        else {
            return 'No visits detected';
        }
    }

    const setAnalyticsRange = (selection) => {
        props.updateCallback(currentMillis() - selection.value)
        setRange(selection)
    };

    const getChartArray = (size) => {
        const a = []
        for (let i = 0; i < size; i++) {
            a.push({ period: '', totalTime: 0 })
        }
        return a;
     }

     const getValueArray = (size) => {
        const v = new Array(size)
         for (let i = 0; i < size; i++) {
             v[i] = 0;
         }
         return v;

     }

     const getIndex = (maxIndex, currentValue, sampleValue) => {
        if (sampleValue === currentValue) {
            return maxIndex
        }
        else {
            return maxIndex - (currentValue - sampleValue)
        }
     }

    const setChart = (data) => {
        const currentRange = range.value / oneDayMillis;
        const customerAnalysis = data.customerAnalysis
        const lastSample = data.to
        if (currentRange < 1) {
            let minutes = minuteFromMillis(lastSample)
            const values = getValueArray(6)
            for (let i = 0; i < customerAnalysis.length; i++) {
                for (let v = 0; v < customerAnalysis[i].visits.length; v++) {
                    const index = (minuteFromMillis(customerAnalysis[i].visits[v].timestamps[0]) / 10).toFixed(0)
                    values[index] += customerAnalysis[i].visits[v].durationMillis / 1000
                }
            }
            const chartArray = getChartArray(6);
            for (let x = 6; x > 0; x--) {
                chartArray[x - 1].period = minutes
                chartArray[x - 1].totalTime = values[x - 1]
                minutes -= 10
                if (minutes < 0)
                    minutes += 60
            }
            setChartData(chartArray)
        }
        else if (currentRange === 1) {
            let hour = hourFromMillis(lastSample)
            const values = getValueArray(24)
            for (let i = 0; i < customerAnalysis.length; i++) {
                for (let v = 0; v < customerAnalysis[i].visits.length; v++) {
                    const index = hourFromMillis(customerAnalysis[i].visits[v].timestamps[0])
                    values[index] += customerAnalysis[i].visits[v].durationMillis / 1000
                }
            }
            const chartArray = getChartArray(24);
            for (let x = 24; x > 0; x--) {
                chartArray[x - 1].period = hour
                chartArray[x - 1].totalTime = values[hour]
                hour --
                if (hour < 0)
                    hour = 23
            }
            setChartData(chartArray)
        }
        else if (currentRange === 7 ) {
            let day = dayFromMillis(lastSample)
            const values = getValueArray(7)
            for (let i = 0; i < customerAnalysis.length; i++) {
                for (let v = 0; v < customerAnalysis[i].visits.length; v++) {
                    const index = dayFromMillis(customerAnalysis[i].visits[v].timestamps[0])
                    values[index] += customerAnalysis[i].visits[v].durationMillis / 1000
                }
            }
            const chartArray = getChartArray(7);
            for (let x = 7; x > 0; x--) {
                chartArray[x - 1].period = weekday[day]
                chartArray[x - 1].totalTime = values[day]
                day --
                if (day < 0)
                    day = 6
            }
            setChartData(chartArray)
        }
        else if (currentRange === 30 ) {
            let week = getWeekNumberFromMillis(lastSample)
            const values = getValueArray(4)
            for (let i = 0; i < customerAnalysis.length; i++) {
                for (let v = 0; v < customerAnalysis[i].visits.length; v++) {
                    const index = getIndex(3, week, getWeekNumberFromMillis(customerAnalysis[i].visits[v].timestamps[0]))
                    values[index] += customerAnalysis[i].visits[v].durationMillis / 1000
                }
            }
            const chartArray = getChartArray(4);
            for (let x = 4; x > 0; x--) {
                chartArray[x - 1].period = 'Week ' + (week)
                chartArray[x - 1].totalTime = values[x - 1]
                week --;
            }
            setChartData(chartArray)
        }
        else if (currentRange === 365 ) {
            let month = monthFromMillis(lastSample)
            const values = getValueArray(12)
            for (let i = 0; i < customerAnalysis.length; i++) {
                for (let v = 0; v < customerAnalysis[i].visits.length; v++) {
                    const index = monthFromMillis(customerAnalysis[i].visits[v].timestamps[0])
                    values[index] += customerAnalysis[i].visits[v].durationMillis / 1000
                }
            }
            const chartArray = getChartArray(12);
            for (let x = 12; x > 0; x--) {
                chartArray[x - 1].period = monthName[month]
                chartArray[x - 1].totalTime = values[month]
                month --;
                if (month < 0)
                    month = 11
            }
            setChartData(chartArray)
        }
    }

    useEffect(() => {
        if (props.analysis.hasOwnProperty('errorMsg')) {
            setError(true);
            setErrorMsg(props.analysis.errorMsg.response.data)
        }
        else {
            setError(false)
            setErrorMsg('')
            setChart(props.analysis)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const PREFIX = 'Analytics';

    const classes = {
        title: `${PREFIX}-title`,
        chart: `${PREFIX}-chart`,
    };

    const Line = props => (
        <LineSeries.Path
            {...props}
            path={line()
                .x(({ arg }) => arg)
                .y(({ val }) => val)
                .curve(curveCatmullRom)}
        />
    );

    const StyledDiv = styled('div')(() => ({
        [`&.${classes.title}`]: {
            textAlign: 'center',
            width: '100%',
            marginBottom: '10px',
        },
    }));

    const Text = ({ text }) => {
        const [mainText, subText] = text.split('\\n');
        return (
            <StyledDiv className={classes.title}>
                <Typography component="h3" variant="h5">
                    {mainText}
                </Typography>
                <Typography variant="subtitle1">{subText}</Typography>
            </StyledDiv>
        );
    };

    const StyledChart = styled(Chart)(() => ({
        [`&.${classes.chart}`]: {
            paddingRight: '30px',
        },
    }));

    return (
        <Paper>
            <Divider />
            <Box margin={4} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                <FormControl  sx={{minWidth: 400}}>
                    <InputLabel id="analytics-picker-label">Showing analytics for</InputLabel>
                    <Select
                        labelId="analytics-picker-select-label"
                        id="analytics-picker--select"


                        value={range.value}
                        label="Showing analytics for"
                        onChange={(e)=>{
                            setAnalyticsRange(e.target)
                        }}
                    >
                    {ranges.map((range) => (
                        <MenuItem
                            key={range.name}
                            value={range.value}
                        >
                            {range.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>
            <Box margin={3} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                <Tooltip title={'Total number of individual customers detected'}>
                    <Badge badgeContent={props.analysis.totalCustomerNo} color="primary" >
                        <PersonSearchIcon sx={{ fontSize: 50, mt: 1 }}/>
                    </Badge>
                </Tooltip>
                <Tooltip title={getAvgMillisTooltip()} sx={{ ml: 5, mr: 5 }}>
                    <Badge badgeContent={getAvgMillis()} color="primary" >
                        <AccessTimeIcon sx={{ fontSize: 50, mt: 1 }}/>
                    </Badge>
                </Tooltip>
                <Tooltip title={'Total number of visits detected'}>
                    <Badge badgeContent={props.analysis.totalNoOfVisits} color="primary" >
                        <TransferWithinAStationIcon sx={{ fontSize: 50, mt: 1 }}/>
                    </Badge>
                </Tooltip>
            </Box>
            {error ?
                <Typography variant="subtitle1" color="text.secondary" marginLeft={2} >
                    {errorMsg}
                </Typography>
                :
                <StyledChart
                    data={chartData}
                    className={classes.chart}
                >
                    <ArgumentScale factory={scalePoint} />
                    <ArgumentAxis />
                    <ValueAxis />

                    <LineSeries
                        name="detections"
                        valueField="totalTime"
                        argumentField="period"
                        seriesComponent={Line}
                    />

                    <Title
                        text="Total Customer Time Detected\n(seconds)"
                        textComponent={Text}
                    />
                    <Animation />
                </StyledChart>
            }
        </Paper>
    );
}

export default AnalysisComponent;