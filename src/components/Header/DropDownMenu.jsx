import React from "react";
import classes from './Header.module.scss';

const DropDownMenu = () => {
    return (
        <div className={classes.dropdownmenu}>
            <ul>
                <li>Hi, Jonathan</li>
                <li>_______</li>
                <li>Profile</li>
                <li>History</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default DropDownMenu;