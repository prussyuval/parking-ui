import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "@fontsource/roboto";

import './App.scss';
import SearchComponent from "./SearchComponent";
import StatisticsPage from "./StatisticsPage";
import Header from "./Header";

function App() {
  return (
    <div className="App">
        <Header />
        <Router>
            <Routes>
                <Route exact path="/">
                    <Route exact path='/' element={<SearchComponent/>}/>
                </Route>
                <Route exact path="/stats/:lotEngName" element={<StatisticsPage />}>

                </Route>
                <Route exact path="/error">
                    {/*<ErrorPage />*/}
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
