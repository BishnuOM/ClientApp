import React, { useState } from "react";
import { debounce } from "lodash";

const Tooltip = (props) => {
    let timeout;
    const [active, setActive] = useState(false);

   
    //const showTip = debounce((value) => {
    //    setActive(true);
    //}, 1000);


    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 0);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {props.children}
            {active && (
                <div className={`Tooltip-Tip ${props.direction || "top"}`}>
                    {/* Content */}
                    {props.content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
