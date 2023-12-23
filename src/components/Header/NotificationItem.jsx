import React from "react";
import classes from './Header.module.scss';
import { useDispatch } from "react-redux";



const NotificationItem = ({ item, openNotifications}) => {   
    
    return (    
        <div className={classes.notification_item}>
        {/* // <div className={`${classes.notification_item} ${ openNotifications ? classes.active : ''}`}> */}
            <p>{item.event}</p>
        </div>
    )
}

export default NotificationItem;