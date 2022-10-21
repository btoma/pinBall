import React from "react";
import ReactTooltip from 'react-tooltip';

const Marker = ({ text, tooltip }) => {
  const {id, name, num_machines, street} = tooltip || {};
  return (
  <div className="circle">
    <span className="circleText" data-tip data-for={id.toString()}>
      {text}
    </span>
    <ReactTooltip id={id.toString()} aria-haspopup='true' >
      <div>
        <p>{name}</p>
        <p>Number Of Machines: {num_machines}</p>
        <p>{street}</p>
      </div>
    </ReactTooltip>
  </div>
)};

export default Marker;