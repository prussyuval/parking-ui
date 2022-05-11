import CircularProgress from "@mui/material/CircularProgress";
import {useEffect, useState} from "react";
import ServerRequest from "./ServerRequest";
import ApexChart from "./helpers/Heatmap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import isObjectEmpty from "./helpers/utils";


const HeatmapPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [parkingLot, setParkingLotId] = useState(null);
    const [heatMapData, setHeatMapData] = useState(null);

    useEffect(() => {
      async function getHeatMapData() {

          const response = await ServerRequest.get('lot-heat-map', {lot_id: parkingLot});
          console.log(response);
          setHeatMapData(response["data"]["heat_map"]);
          setLoading(false);
        }

      if (parkingLot === null) {
          return;
      }

      getHeatMapData();
  }, [parkingLot]);

    const searchParkingLot = (event) => {
        setLoading(true);
        setParkingLotId(event.target.value);
    }

    if (parkingLot === null) {
        return (
        <div>
            <Box sx={{ minWidth: 120 }} id="parking-lot-heat-map-selector">
              <FormControl fullWidth>
                <InputLabel>Parking lot id</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={parkingLot}
                  label="Parking lot id"
                  onChange={searchParkingLot}
                >
                  <MenuItem value={40}>Ravnitski</MenuItem>
                  <MenuItem value={45}>Tel nordau</MenuItem>
                  <MenuItem value={94}>Habima theatre</MenuItem>
                  <MenuItem value={29}>montefiore</MenuItem>
                  <MenuItem value={10}>golda</MenuItem>
                  <MenuItem value={123}>arlosoroff</MenuItem>
                  <MenuItem value={122}>assuta</MenuItem>
                  <MenuItem value={3}>basel</MenuItem>
                  <MenuItem value={37}>cinerama</MenuItem>
                  <MenuItem value={31}>da vinchi</MenuItem>
                  <MenuItem value={4}>hevra hadasha</MenuItem>
                  <MenuItem value={39}>palmach</MenuItem>
                  <MenuItem value={19}>ha-tsfira</MenuItem>
                  <MenuItem value={38}>saadia gaon</MenuItem>
                  <MenuItem value={120}>libar</MenuItem>
                </Select>
              </FormControl>
            </Box>
        </div>
        );
    }

    if (loading === true) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <div>
                <Box sx={{ minWidth: 120 }} id="parking-lot-heat-map-selector">
                  <FormControl fullWidth>
                    <InputLabel>Parking lot</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={parkingLot}
                      label="Choose parking lot"
                      onChange={searchParkingLot}
                    >
                      <MenuItem value={40}>Ravnitski</MenuItem>
                      <MenuItem value={45}>Tel nordau</MenuItem>
                      <MenuItem value={94}>Habima theatre</MenuItem>
                      <MenuItem value={29}>montefiore</MenuItem>
                      <MenuItem value={10}>golda</MenuItem>
                      <MenuItem value={123}>arlosoroff</MenuItem>
                      <MenuItem value={122}>assuta</MenuItem>
                      <MenuItem value={3}>basel</MenuItem>
                      <MenuItem value={37}>cinerama</MenuItem>
                      <MenuItem value={31}>da vinchi</MenuItem>
                      <MenuItem value={4}>hevra hadasha</MenuItem>
                      <MenuItem value={39}>palmach</MenuItem>
                      <MenuItem value={19}>ha-tsfira</MenuItem>
                      <MenuItem value={38}>saadia gaon</MenuItem>
                      <MenuItem value={120}>libar</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
            </div>
            {
                !isObjectEmpty(heatMapData) && (
                    <ApexChart heatMapData={heatMapData} />
                )
            }
            {
                isObjectEmpty(heatMapData) && (
                    <div>
                        Heatmap data is not known, but it will be available in the near future
                    </div>
                )
            }
        </div>
    );
};

export default HeatmapPage;
