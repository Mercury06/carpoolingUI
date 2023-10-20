import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/userReducer";

const DropDownMenu = () => {
    const dispatch = useDispatch();
    return (
        <div className={classes.dropdownmenu}>
            <ul>
                <li><span>Hi, Jonathan</span></li>
                <hr></hr>                
                <li><span>Profile</span></li>
                <li><span>History</span></li>
                <li onClick={() => dispatch(logout())}><span>Logout</span></li>
            </ul>
        </div>
    )
}

export default DropDownMenu;