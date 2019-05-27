import React from 'react'
import {NavLink} from "react-router-dom";

const MenuItem = ({to, isActive, icon}) => (
    <NavLink to={to} activeClassName={"active"} className={"item"}
             isActive={isActive}>
        <i className={`fas ${icon} menu-bar-item`}/>
    </NavLink>
);

export default MenuItem;
