import CircularProgress from "@mui/material/CircularProgress";
import {useEffect, useState} from "react";
import ServerRequest from "./ServerRequest";
import ApexChart from "./helpers/Heatmap";


const HeatmapPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [heatMapData, setHeatMapData] = useState(null);

    useEffect(() => {
      async function refreshOnMount() {

          const response = await ServerRequest.get('lot-heat-map', {lot_id: 40});
          console.log(response);
          setHeatMapData(response["data"]["heat_map"]);
          setLoading(false);
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
