import React from "react";
import classes from './Header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";



const NotificationMenu = ({openNotifications, notificationMenuRef, children}) => {
    const notifications = useSelector((state) => state.user.notifications);
    
    return (    
        <div ref={notificationMenuRef} className={`${classes.notificationmenu_wrap} ${ openNotifications ? classes.active : ''}`}>
            <div className={classes.notificationmenu}>
                {/* <p>Notifications</p> */}
                {/* <div>{children}</div> */}
                {notifications.map((item) => <NotificationItem key={item._id} />)}
            </div>                
        </div>
    )
}

export default NotificationMenu;