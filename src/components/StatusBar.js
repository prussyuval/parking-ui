import {Fragment} from "react";

const getText = (full, few, empty, future) => {
    if ( full === 100 || few === 100 || empty === 100) {
        let status;
        if (full === 100) {status = "full"}
        if (few === 100) {status = "have a few spots left"}
        if (empty === 100) {status = "free"}

        const time = future ? "will" : "is";
        return `Parking lot ${time} always ${status} at this time`;
    }

    if ( full > 50 || few > 50 || empty > 50) {
        let status;
        if (full > 50) {status = "full"}
        if (few > 50) {status = "have a few spots left"}
        if (empty > 50) {status = "free"}
        const time = future ? "will" : "is";
        return `Parking lot ${time} usually ${status} at this time`;
    }

    const statuses = [full, empty, few];
    if (statuses.filter(s => s === 50).length === 2) {
        let statuses = [];
        if (full === 50) {statuses.push("full")}
        if (few === 50) {statuses.push("almost full")}
        if (empty === 50) {statuses.push("empty")}
        const time = future ? "will" : "is";
        return `Parking lot ${time} usually be ${statuses.join(" or ")} at this time`;
    }

    return `Parking lot capacity is very inconsistence`;
}

const roundNumber = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}


const StatusBar = ({...props}) => {
    const total = props.full + props.empty + props.few;

    if (total === 0) {
        return null;
    }

    const fullWidth = (props.full / total) * 100;
    const fewWidth = (props.few / total) * 100;
    const emptyWidth = (props.empty / total) * 100;

    const text = getText(fullWidth, fewWidth, emptyWidth, props.future === true);

    return (
        <div className="status-bar">
            {props.withText && (
                <div className="all-progress-text">
                    {text}
                </div>
            )}
            <div className="all-progress">
                {fullWidth !== 0 && (
                    <div className="progress full-progress" style={{width: `${fullWidth}%`}}>
                        <div className="progress-text">
                            {`${roundNumber(fullWidth)}%`}
                        </div>
                    </div>
                    )
                }
                {fewWidth !== 0 && (
                    <div className="progress few-progress" style={{width: `${fewWidth}%`}}>
                        <div className="progress-text">
                            {`${roundNumber(fewWidth)}%`}
                        </div>
                    </div>
                    )
                }
                {emptyWidth !== 0 && (
                    <div className="progress empty-progress" style={{width: `${emptyWidth}%`}}>
                        <div className="progress-text">
                            {`${roundNumber(emptyWidth)}%`}
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
};

export default StatusBar;