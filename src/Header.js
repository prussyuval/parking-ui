import {Fragment, useState} from "react";
import {Button, Drawer} from "@mui/material";
import MenuIcon from '@material-ui/icons/Menu';
import {useNavigate} from "react-router-dom";

const Header = (props) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideBarOpen(open);
  };

  const navigateHome = () => {
      navigate("/", {replace: true});
  }

  const navigateToHeatMap = () => {
      toggleDrawer(false);
      navigate("/heat-map", {replace: true});
  }

    return (
        <div className="header">
            <MenuIcon onClick={toggleDrawer(true)} className="menu-icon" color={"inherit"} />
            <Drawer
              anchor="left"
              className="drawer"
              open={sideBarOpen}
              onClose={toggleDrawer(false)} >
                <div className="drawer-option" onClick={navigateToHeatMap}>
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