import {Fragment, useEffect, useState} from "react";
import "@fontsource/roboto";

import ServerRequest from "./ServerRequest";
import './App.scss';

const PARKING_LOT_NAMES = {
    "tel nordau": "תל נורדאו",
    "habima theatre": "הבימה",
    "ravnitski": "רבניצקי",
}

const PARKING_LOT_IDS = {
    "tel nordau": 45,
    "habima theatre": 94,
    "ravnitski": 45,
}

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

const Stats = (props) => {
    if (props.statistics === null) {
        return null;
    }

    if (props.statistics["success"] === false) {
        return (
            <div>
                התרחשה איזשהי בעיה
            </div>
        )
    }
    const currentStatus = props.statistics["data"]["current"];

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
                        Object.entries(props.statistics["data"]["stored_status"]).map(([time, status]) => {
                            return (
                                <div style={{color: STATUS_COLOR[NUMERIC_STATUS_MAPPING[status]]}}>
                                    {time} => {status}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

function App() {
  const [lotSearchValue, setLotSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState({});
  const [selectedLotName, setSelectedLotName] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
      async function refreshOnMount() {
          if (selectedLotName === null) {
              return;
          }
          const selectedLotId = PARKING_LOT_IDS[selectedLotName];

          const response = await ServerRequest.get('status', {lotId: selectedLotId});
          setStatistics(response.data);
          // setStatistics({"success":true,"data":{"current":"EMPTY","stored_status":{"08/11/2021 22:43":1,"11/10/2021 22:43":2},"time":"08/11/2021 22:43"}});
        }

      refreshOnMount();
  }, [selectedLotName]);

  const onSearchChange = (e) => {
      const searchedValue = e.target.value || "";
      setLotSearchValue(searchedValue);
      setSelectedLotName(null);

      if (searchedValue === "") {
          setSearchOptions({});
          return;
      }

      let searchResults = {};

      for (const [engName, hebName] of Object.entries(PARKING_LOT_NAMES)) {
          if (engName.includes(searchedValue.toLowerCase()) || hebName.includes(searchedValue)) {
              searchResults[engName] = hebName;
          }
      }
      setSearchOptions(searchResults);
  }

  const selectLot = (engName) => {
      setSelectedLotName(engName);
      setLotSearchValue(engName);
      setSearchOptions([]);
  }

  return (
      <div className="App">
          <div id="site-title">
              Free Park
          </div>
          <input id="lot-search" value={lotSearchValue} onChange={onSearchChange}/>
          {
              selectedLotName === null && Object.entries(searchOptions).map(([engName, hebName]) =>
                  <div key={engName} className="lot-option" onClick={() => {selectLot(engName)}}>
                      {engName.charAt(0).toUpperCase() + engName.slice(1)}
                  </div>
              )
          }
          {
              selectedLotName !== null && <Stats statistics={statistics}/>
          }
      </div>
  );
}

export default App;
