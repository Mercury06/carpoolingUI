import React from 'react';
import s from './Rides.module.scss';
//import avaPhoto from './../../assets/images/ava-rez.jpg';

const RideItem = ({ pointA, pointB, seats, date }) => {
  // const onClickItem = () => {
  //     onItem ({id, name, status, species, type, gender, originName, locationName, image, created})
  //     setModal (true);
  //     setSelectedId (onItem);
  // }
  //debugger;
  return (
    <div className={s} onClick={() => {}}>
      <div className={s.avatar}></div>

      <div className={s.infoBlock}>
        <div>
          <b>откуда:{pointA}</b>{' '}
        </div>
        <div>
          <b>куда:{pointB}</b>{' '}
        </div>
        <div>
          <b>мест свободно:{seats}</b>{' '}
        </div>
        <div>
          <b>дата поездки:{date}</b>{' '}
        </div>
      </div>
    </div>
  );
};

export default RideItem;
