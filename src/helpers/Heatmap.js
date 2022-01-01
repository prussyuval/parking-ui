import ReactApexChart from 'react-apexcharts';
import React from "react";

const STR_DAY_MAP = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
}

const formatHour = (hour) => {
    if (hour < 10) {
        return `0${hour}:00`;
    }

    return `${hour}:00`
}

const getHeatMapDataByHour = (heatMapData, hourI) => {
    let realHeatMapData = [];

    for (const[day, hourValues] of Object.entries(heatMapData)) {
        let dayStr = Object.keys(STR_DAY_MAP).filter(function(key) {return STR_DAY_MAP[key] === day})[0];
        console.log(hourValues);
        console.log(hourI);
        let hourValue = hourValues[hourI];
        console.log(dayStr);
        console.log(hourValue);
        realHeatMapData.push(
            {
                x: dayStr, y: Math.round((100 - hourValue) * 100) / 100
            }
        )
    }

    return realHeatMapData;
}

const produceChartDataFlipped = (heatMapData) => {
    const data = [];
    for(let i = 0; i <= 23; i++)
        data.push(
            {
                name: formatHour(i),
                data: getHeatMapDataByHour(heatMapData, i)
            }
        );
    return data;
}

const getHeatMapDataByDay = (heatMapData, dayI) => {
    let realHeatMapData = []

    for (const[hour, value] of Object.entries(heatMapData[STR_DAY_MAP[dayI]])) {
        realHeatMapData.push(
            {
                x: formatHour(hour), y: Math.round((100 - value) * 100) / 100
            }
        )
    }

    return realHeatMapData;
}

const produceChartData = (heatMapData) => {
    const data = [];
    for (let day in Object.keys(STR_DAY_MAP)) {
        data.push(
            {
                name: day,
                data: getHeatMapDataByDay(heatMapData, day)
            }
        )
    }
    return data;
};

class ApexChart extends React.Component {
    render() {
        const chartData = {
            series: produceChartDataFlipped(this.props.heatMapData),
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
                    text: ''
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        radius: 0,
                        useFillColorAsStroke: false,
                        colorScale: {
                            ranges: [{
                                    from: 10,
                                    to: 100,
                                    name: 'free',
                                    color: '#00A100'
                                },
                                {
                                    from: 5,
                                    to: 10,
                                    name: 'almost full',
                                    color: '#FFB200'
                                },
                                {
                                    from: 0,
                                    to: 5,
                                    name: 'full',
                                    color: '#FF0000'
                                }
                            ]
                        }
                    }
                }
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