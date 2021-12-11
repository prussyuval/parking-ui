import {Fragment} from "react";

const getText = (full, few, empty) => {
    if ( full === 100 || few === 100 || empty === 100) {
        let status;
        if (full === 100) {status = "full"}
        if (few === 100) {status = "have a few spots left"}
        if (empty === 100) {status = "free"}
        return `Parking lot is always ${status} now`;
    }

    if ( full > 50 || few > 50 || empty > 50) {
        let status;
        if (full > 50) {status = "full"}
        if (few > 50) {status = "have a few spots left"}
        if (empty > 50) {status = "free"}
        return `Parking lot is usually ${status} now`;
    }

    const statuses = [full, empty, few];
    if (statuses.filter(s => s === 50).length === 2) {
        let statuses = [];
        if (full === 50) {statuses.push("full")}
        if (few === 50) {statuses.push("almost full")}
        if (empty === 50) {statuses.push("empty")}
        return `Parking lot is usually ${statuses.join(" or ")} now`;
    }

    return `Parking lot capacity is very inconsistence`;
}


const StatusBar = ({...props}) => {
    const total = props.full + props.empty + props.few;
    const fullWidth = (props.full / total) * 100;
    const fewWidth = (props.few / total) * 100;
    const emptyWidth = (props.empty / total) * 100;

    const text = getText(fullWidth, fewWidth, emptyWidth);

    return (
        <Fragment>
            <div className="all-progress-text">
                {text}
            </div>
            <div className="all-progress">
                {fullWidth !== 0 && (
                    <div className="progress full-progress" style={{width: `${fullWidth}%`}}>
                        <div className="progress-text">
                            {`${fullWidth}%`}
                        </div>
                    </div>
                    )
                }
                {fewWidth !== 0 && (
                    <div className="progress few-progress" style={{width: `${fewWidth}%`}}>
                        <div className="progress-text">
                            {`${fewWidth}%`}
                        </div>
                    </div>
                    )
                }
                {emptyWidth !== 0 && (
                    <div className="progress empty-progress" style={{width: `${emptyWidth}%`}}>
                        <div className="progress-text">
                            {`${emptyWidth}%`}
                        </div>
                    </div>
                    )
                }
            </div>
        </Fragment>
    )
};

export default StatusBar;