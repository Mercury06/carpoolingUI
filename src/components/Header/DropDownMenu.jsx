import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/userReducer";


const DropDownMenu = ({ openDropdown, user , dropDownMenuRef}) => {
    const dispatch = useDispatch();
    // console.log("user:", user)
    return (
        <div ref={dropDownMenuRef} className={`${classes.dropdownmenu_wrap} ${ openDropdown ? classes.active : ''}`}>        
            <div className={classes.dropdownmenu}>
                <ul>
                    <li><span>Hi, {user.username} </span></li>
                    <hr></hr>                
                    <li><span>Profile</span></li>
                    <li><span>History</span></li>
                    <li onClick={() => dispatch(logout())}><span>Logout</span></li>
                </ul>
            </div>    
           
        </div>
    )
}

export default DropDownMenu;