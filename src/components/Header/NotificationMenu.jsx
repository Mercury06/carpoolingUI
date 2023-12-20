import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";



const NotificationMenu = ({openNotifications, notificationMenuRef}) => {
   
    
    return (    
        <div ref={notificationMenuRef} className={`${classes.notificationmenu_wrap} ${ openNotifications ? classes.active : ''}`}>
            <div className={classes.notificationmenu}>
                {/* <p>Notifications</p> */}
            </div>                
        </div>
    )
}

export default NotificationMenu;