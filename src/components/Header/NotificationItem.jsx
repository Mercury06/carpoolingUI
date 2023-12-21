import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";



const NotificationItem = () => {   
    
    return (    
        <div className={classes.notification_item}>
            <p>some notification</p>
        </div>
    )
}

export default NotificationItem;