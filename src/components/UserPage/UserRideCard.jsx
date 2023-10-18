import React from 'react';
import s from './UserRide.module.scss';
import { BsGeoAltFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md"
import { SeatIcon } from '../assets/svg/BoxIcons';


const moment = require('moment');


const UserRideCard = (props) => {  
  
  const {item, onAsksClickHandler, onConfirmedClickHandler, prepareRideForDelete} = props;
  console.log("item:", item);
  
  return (
   
            <div className={s.card}>
                <div className={s.card_content}>
                    <div className={s.card_content_sidebar}>
                                           
                          <span><BsGeoAltFill /></span>
                          <span>{item.localityFrom.localityName}</span>
                          <span className={s.vertical_dashed_line}></span>                          
                          <span><BsGeoAltFill /></span>
                          <span>{item.destination.localityName}</span>
                        
                    </div>
                    <div className={s.card_content_main}>
                      <div className={s.card_content_main_info}>
                        <span>{moment(item.date).format('DD-MMM-YYYY')}</span>                        
                        <span>{item.seats} 3 seats <SeatIcon /> </span>
                        <div className={s.info_quantity}><span onClick={(e)=>onAsksClickHandler(e, item)}>asks: {item.asks.length}</span>{"   "}
                                                        <span onClick={(e)=>onConfirmedClickHandler(e, item)}>confirmed: {item.passengers.length}</span>
                        </div>                        
                      </div>
                        
                    </div>                   
                </div>
                <div className={s.delete_btn_container} onClick={(e)=> prepareRideForDelete(e, item)}>               
                        <div className={s.delete_btn}>
                          <center><span>delete</span></center>
                        </div>                
                    </div>
              </div> 
                       
          );
}        
export default UserRideCard;
