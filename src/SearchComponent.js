import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import SVG from "./assets/svg";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomePage from "./HomePage";

const PARKING_LOT_NAMES = {
    "tel nordau": "תל נורדאו",
    "habima theatre": "הבימה",
    "ravnitski": "רבניצקי",
    "montefiore": 'מונטיפיורי',
    "golda": 'גולדה',
    "arlosoroff": 'ארלוזורוב 17',
    "assuta": 'אסותא',
    "basel": 'באזל',
    "cinerama": 'סינרמה',
    "Da vinci":  'מפעל הפיס',
    'hevra hadasha': 'חברה חדשה',
    'palmach': 'פלמ״ח',
    'ha-tsfira': 'הצפירה 1',
    'saadia gaon': 'סעדיה גאון',
}

const SearchComponent = () => {
  const [lotSearchValue, setLotSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState(PARKING_LOT_NAMES);
  const navigate = useNavigate();

  const onSearchChange = (e) => {
      const searchedValue = e.target.value || "";
      setLotSearchValue(searchedValue);
      navigate(`/`, {replace: true});

      if (searchedValue === "") {
          setSearchOptions(PARKING_LOT_NAMES);
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
          <div>
              <input id="lot-search" value={lotSearchValue} onChange={onSearchChange} />
              <SVG name="search" width="16px" className="search-icon" />
          </div>

          {lotSearchValue === "" && (
              <HomePage />
          )}

          <div className="search-results">
              {Object.entries(searchOptions).map(([engName, hebName]) =>
                  <div key={engName} className="lot-option" onClick={() => {selectLot(engName)}}>
                      <ArrowRightIcon />
                      <div className="lot-option__text">
                        {engName.charAt(0).toUpperCase() + engName.slice(1)}
                      </div>
                  </div>
                  )
          }
          </div>
      </Fragment>
  );
}

export default SearchComponent;