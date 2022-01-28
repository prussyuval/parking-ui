import ReactApexChart from 'react-apexcharts';
import React from "react";

const FLIPPED = true;

const STR_DAY_MAP = {
    "Sunday": 6,
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
}

const formatHour = (hour) => {
    let hourComponent = "";
    if (hour < 10) {
        hourComponent = `0${parseInt(hour)}`;
    } else {
        hourComponent = parseInt(hour);
    }

    let minuteComponent = "";
    if (hour % 1 === 0) {
        minuteComponent = "00";
    } else {
        minuteComponent = "30";
    }

    return `${hourComponent}:${minuteComponent}`
}

const getHeatMapDataByHour = (heatMapData, hourI) => {
    const DAYS_ORDER = [6,0,1,2,3,4,5];
    let realHeatMapData = [];

    for (let day of DAYS_ORDER) {
        let hourValues = heatMapData[day];
        if (hourValues === undefined) {
            hourValues = {};
        }

        let dayStr = Object.keys(STR_DAY_MAP).filter(function(key) {return STR_DAY_MAP[key] === parseInt(day)})[0];

        let fetchedHourValue = hourI.toFixed(1)
        if (fetchedHourValue.endsWith(".0")) {
            fetchedHourValue = fetchedHourValue.replace(".0", "")
        }

        let hourValue = hourValues[fetchedHourValue];

        let yValue;
        if (hourValue !== undefined) {
            yValue = 100 - (Math.round((100 - hourValue) * 100) / 100);
        } else {
            yValue = -1;
        }

        realHeatMapData.push({x: dayStr, y: yValue});
    }

    return realHeatMapData;
}

const produceChartDataFlipped = (heatMapData) => {
    const data = [];
    for(let i = 0; i <= 23.5; i += 0.5)
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

        let yValue;
        if (value !== undefined) {
            yValue = 100 - (Math.round((100 - value) * 100) / 100)
        } else {
            yValue = -1;
        }

        realHeatMapData.push({x: formatHour(hour), y: yValue});
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
            series: FLIPPED ? produceChartDataFlipped(this.props.heatMapData) : produceChartData(this.props.heatMapData),
            options: {
                chart: {
                    type: 'heatmap',
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        radius: 0,
                        useFillColorAsStroke: false,
                        colorScale: {
                            ranges: [
                            {
                                from: -1,
                                to: -1,
                                name: 'no info',
                                color: '#000000'
                            },
                            {
                                from: 0,
                                to: 90,
                                name: 'low',
                                color: '#00A100'
                              },
                              {
                                from: 88,
                                to: 89,
                                name: 'almost full',
                                color: '#ffe600'
                              },
                              {
                                from: 89,
                                to: 90,
                                name: 'almost full',
                                color: '#ffd000'
                              },
                              {
                                from: 89,
                                to: 90,
                                name: 'almost full',
                                color: '#ffbf00'
                              },
                              {
                                from: 90,
                                to: 91,
                                name: 'almost full',
                                color: '#ffae00'
                              },
                              {
                                from: 91,
                                to: 92,
                                name: 'almost full',
                                color: '#ffa200'
                              },
                              {
                                from: 92,
                                to: 93,
                                name: 'almost full',
                                color: '#ff9100'
                              },
                              {
                                from: 93,
                                to: 94,
                                name: 'almost full',
                                color: '#ff7700'
                              },
                              {
                                from: 94,
                                to: 95,
                                name: 'almost full',
                                color: '#ff6f00'
                              },
                              {
                                from: 95,
                                to: 96,
                                name: 'full',
                                color: '#ff5e00'
                              },
                              {
                                from: 96,
                                to: 97,
                                name: 'full',
                                color: '#ff4d00'
                              },
                              {
                                from: 97,
                                to: 98,
                                name: 'full',
                                color: '#ff3300'
                              },
                              {
                                from: 98,
                                to: 99,
                                name: 'full',
                                color: '#ff2600'
                              },
                              {
                                from: 99,
                                to: 100,
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
                <ReactApexChart options={chartData.options} series={chartData.series} type="heatmap" height={FLIPPED ? 1000 : 350}/>
            </div>
        )
    }
}

export default ApexChart;