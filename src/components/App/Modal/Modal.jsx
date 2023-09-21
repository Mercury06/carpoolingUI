import React from "react";
import s from "./Modal.module.scss";
import cn from 'classnames';
import { Button } from "antd";

// const Modal = ({ active, setActive, children }) => {
//     return (
//         <div className={active ? s.modal_active : s.modal} onClick = {() => setActive (false)}>
//             <div className={active ? s.modal_content_active : s.modal_content} onClick = {e => e.stopPropagation()}>
//                 { children }
//             </div>
//         </div>
//     );
// };

// const Modal = ({ active, setActive, children }) => {
//     return (
//         <div className={cn(s.modal, {[s.modal_active]: active === true })} onClick = {() => setActive (false)}>
//             <div className={cn(s.modal_content, {[s.modal_content_active]: active === true })}>
//                 {children}
//             </div>
//         </div>
//     );
// };

const Modal = ({ rideItem, deleteRideHandler, setModalActiveHandler, children }) => {
    return (
        <div className={s.modal}>
            <div className={s.modal_content}>
                {children}
                {/* <div><button className={s.btn} onClick={()=>setModalActiveHandler(false)}>Cancel</button></div> */}
                {/* <div><button className={s.btn} onClick={()=>deleteRideHandler(rideItem)}>Ok</button></div>
                <div><button className={s.btn} onClick={()=>setModalActiveHandler(false)}>Cancel</button></div> */}
            </div>            
        </div>
    );
};

export default Modal;