import {Fragment, useState} from "react";
import {Button, Drawer} from "@mui/material";
import MenuIcon from '@material-ui/icons/Menu';
import {useNavigate} from "react-router-dom";
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Header = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (event, open) => {
    if (event !== null && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideBarOpen(open);
  };

  const navigateHome = () => {
      navigate("/", {replace: true});
  }

  const navigateToHeatMap = () => {
      toggleDrawer(null, false);
      navigate("/heat-map", {replace: true});
  }

    return (
        <div className="header">
            <MenuIcon onClick={(event) => toggleDrawer(event, true)} className="menu-icon" color={"inherit"} />
            <Drawer
              anchor="left"
              className="drawer"
              open={sideBarOpen}
              onClose={() => {toggleDrawer(null, false)}} >
                <div className="drawer-option" onClick={navigateToHeatMap}>
                    <AnalyticsIcon />
                    Heat map
                </div>
            </Drawer>
            <div id="site-title" onClick={navigateHome}>
                  Parkour
            </div>
            <div>

            </div>
        </div>
    );
}

export default Header;