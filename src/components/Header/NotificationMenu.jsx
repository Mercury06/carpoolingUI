import React from "react";
import classes from './Header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";



const NotificationMenu = ({openNotifications, notificationMenuRef, notifications, children}) => {
    console.log("notifications in NotificationMenu>>>>>>>>", notifications)
    return (    
        <div ref={notificationMenuRef} className={`${classes.notificationmenu_wrap} ${ openNotifications ? classes.active : ''}`}>         
            {/* {notifications.map((item) => <NotificationItem item={item} openNotifications={openNotifications} key={item._id} />)}   */}
        </div>
    )
}

export default NotificationMenu;