import {Fragment} from "react";

const Header = (props) => {
    return (
        <Fragment>
            <div id="site-title">
                  Free Park
            </div>
            {props.backButton === true && (
                <div>
                    Back
                </div>
            )}
        </Fragment>
    );
}

export default Header;