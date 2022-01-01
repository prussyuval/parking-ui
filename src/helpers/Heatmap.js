import ReactApexChart from 'react-apexcharts';
import React from "react";

const STR_DAY_MAP = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
}

const getHeatMapDataByDay = (heatMapData, dayI) => {
    console.log(heatMapData[STR_DAY_MAP[dayI]]);

    let realHeatMapData = []

    for (const[hour, value] of Object.entries(heatMapData[STR_DAY_MAP[dayI]])) {
        realHeatMapData.push(
            {
                x: hour, y: value
            }
        )
    }

    return realHeatMapData;
}

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const chartData = {
            series: [{
                    name: 'Sunday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Sunday')
                },
                {
                    name: 'Monday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Monday')
                },
                {
                    name: 'Tuesday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Tuesday')
                },
                {
                    name: 'Wednesday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Wednesday')
                },
                {
                    name: 'Thursday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Thursday')
                },
                {
                    name: 'Friday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Friday')
                },
                {
                    name: 'Saturday',
                    data: getHeatMapDataByDay(this.props.heatMapData, 'Saturday')
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#008FFB"],
                title: {
                    text: 'HeatMap Chart (Single color)'
                },
            },
        };

        return (
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="heatmap" height={350}/>
            </div>
        )
    }
}

export default ApexChart;