import React from "react";
import { MdDeleteSweep, MdModeEdit } from "react-icons/md";
const Items = (props) => {
  return (
    <div className="list">
      <ul>
        <li>
          {props.name}</li>
          </ul>
          <div className="icons">
          <button onClick={props.edit}>
            <MdModeEdit className="icon1"/>
          </button>
          <button onClick={props.remove}>
            <MdDeleteSweep />
          </button>
          </div>
        
 
    </div>
  );
};
export default Items;
