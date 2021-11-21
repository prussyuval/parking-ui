import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import SVG from "./assets/svg";

const PARKING_LOT_NAMES = {
    "tel nordau": "תל נורדאו",
    "habima theatre": "הבימה",
    "ravnitski": "רבניצקי",
}

const SearchComponent = () => {
  const [lotSearchValue, setLotSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState({});
  const navigate = useNavigate();

  const onSearchChange = (e) => {
      const searchedValue = e.target.value || "";
      setLotSearchValue(searchedValue);
      navigate(`/`, {replace: true});

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
      setLotSearchValue(engName);
      setSearchOptions([]);
      navigate(`/stats/${engName}`, {replace: true});
  }

  return (
      <Fragment>
          <input id="lot-search" value={lotSearchValue} onChange={onSearchChange} />
          <SVG name="search" width="16px" className="search-icon" />
          {Object.entries(searchOptions).map(([engName, hebName]) =>
              <div key={engName} className="lot-option" onClick={() => {selectLot(engName)}}>
                  {engName.charAt(0).toUpperCase() + engName.slice(1)}
              </div>
              )
          }
      </Fragment>
  );
}

export default SearchComponent;