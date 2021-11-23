import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ServerRequest from "./ServerRequest";

const PARKING_LOT_STATUS = {
    EMPTY: "Many parking spots are available",
    FEW_LEFT: "Parking lot has limited number of spots",
    FULL: "Parking lot is full",
};

const STATUS_COLOR = {
    EMPTY: "#44B056",
    FEW_LEFT: "#F0DB19",
    FULL: "#ED3C15",
}

const NUMERIC_STATUS_MAPPING = {
    1: "EMPTY",
    2: "FEW_LEFT",
    3: "FULL",
}

const PARKING_LOT_IDS = {
    "tel nordau": 45,
    "habima theatre": 94,
    "ravnitski": 40,
}


const StatisticsPage = (props) => {
    const { lotEngName } = useParams();
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
      async function refreshOnMount() {
          if (lotEngName === null) {
              return;
          }
          const selectedLotId = PARKING_LOT_IDS[lotEngName];
          const response = await ServerRequest.get('status', {lot_id: selectedLotId});
          setStatistics(response);
        }

      refreshOnMount();
  }, [lotEngName]);

    if (statistics === null) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (statistics["success"] === false) {
        return (
            <div>
                התרחשה איזשהי בעיה
            </div>
        )
    }
    const currentStatus = statistics["data"]["current"];

    return (
        <Fragment>
            <div className="statistics-section">
                <div className="statistics-title">
                    Now
                </div>
                <div className="statistics-content" style={{color: STATUS_COLOR[currentStatus]}}>
                    {PARKING_LOT_STATUS[currentStatus]}
                </div>
            </div>
            <div className="statistics-section">
                <div className="statistics-title">
                    Previous
                </div>
                <div className="statistics-content">
                    {
                        Object.entries(statistics["data"]["stored_status"]).map(([time, status]) => {
                            return (
                                <div style={{color: STATUS_COLOR[NUMERIC_STATUS_MAPPING[status]]}}>
                                    {time} => {NUMERIC_STATUS_MAPPING[status]}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="statistics-section">
                <div className="statistics-title">
                    Future (prediction in 30 minutes)
                </div>
                <div className="statistics-content">
                    {
                        Object.entries(statistics["data"]["future_status"]).map(([time, status]) => {
                            return (
                                <div style={{color: STATUS_COLOR[NUMERIC_STATUS_MAPPING[status]]}}>
                                    {time} => {NUMERIC_STATUS_MAPPING[status]}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default StatisticsPage;