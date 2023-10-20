import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/userReducer";


const DropDownMenu = ({ openDropdown }) => {
    const dispatch = useDispatch();
    console.log("openDropdown:", openDropdown)
    return (
        <div className={`${classes.dropdownmenu} ${ openDropdown ? classes.active : ''}`}>        
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