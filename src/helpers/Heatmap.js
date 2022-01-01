import HeatMap from "react-heatmap-grid/src";

const STR_DAY_MAP = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
}

const getHeatMapDataByDate = (heatMapData, dayI, hourI) => {
    const day = heatMapData[dayI];
    if (day === undefined) {
        return null;
    }

    const hour = day[hourI];

    if (hour === undefined) {
        return null;
    }

    return hour;
}

const produceHeatMapElement = (heatMapData) => {
    const xLabels = new Array(24).fill(0);
    const yLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = new Array(yLabels.length)
      .fill(0)
      .map((dayI) =>
        new Array(xLabels.length).fill(0).map((hourI) => getHeatMapDataByDate(heatMapData, dayI, hourI))
      );

    return (
        <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
    );
}

export default produceHeatMapElement;