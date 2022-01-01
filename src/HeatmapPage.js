import CircularProgress from "@mui/material/CircularProgress";
import {useEffect, useState} from "react";
import ServerRequest from "./ServerRequest";
import ApexChart from "./helpers/Heatmap";


const HeatmapPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [heatMapData, setHeatMapData] = useState(null);

    useEffect(() => {
      async function refreshOnMount() {

          const response = await ServerRequest.get('lot-heat-map', {lot_id: 45});
          setLoading(false);
          console.log(response);
          setHeatMapData(response);
          // setStatistics({"success":true,"data":{"current":"EMPTY","future_status": {}, "stored_status":{"08/11/2021 22:43":1,"11/10/2021 22:43":2},"time":"08/11/2021 22:43"}});
        }

      refreshOnMount();
  }, []);

    if (loading === true) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    console.log(heatMapData);
    return (
        <ApexChart heatMapData={heatMapData} />
    );
}

export default HeatmapPage;
