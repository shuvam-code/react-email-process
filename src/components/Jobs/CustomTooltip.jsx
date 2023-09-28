import React, { useMemo } from 'react';
import './CustomTooltip.css'
const CustomTooltip = (props) => {
    const data = useMemo(
        () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
        []
    );

    return (
        <div
            className="custom-tooltip"
            style={{ backgroundColor: props.color || 'white' }}
        >
            <p>
                <span>Plugin Name: </span> {data.pluginName}
            </p>
            <p>
                <span>Product ID: </span> {data.product1_id}
            </p>
        </div>
    );
};

export default CustomTooltip;