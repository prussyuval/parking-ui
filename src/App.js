import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "@fontsource/roboto";

import './styles/index.scss';
import SearchComponent from "./SearchComponent";
import StatisticsPage from "./StatisticsPage";
import Header from "./Header";
import HeatmapPage from "./HeatmapPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<SearchComponent/>}/>
                <Route exact path="/stats/:lotEngName" element={<StatisticsPage />} />
                <Route exact path="/heat-map" element={<HeatmapPage/>} />
                <Route exact path="/error">
                    {/*<ErrorPage />*/}
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
