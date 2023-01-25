import React from 'react';
import s from './Characters.module.scss';
//import avaPhoto from './../../assets/images/ava-rez.jpg';

const RideItem = ({ props }) => {
  // const onClickItem = () => {
  //     onItem ({id, name, status, species, type, gender, originName, locationName, image, created})
  //     setModal (true);
  //     setSelectedId (onItem);
  // }

  return (
    <div className={s} onClick={() => {}}>
      <div className={s.avatar}></div>

      <div className={s.infoBlock}>
        <div>
          <b>name:</b>{' '}
        </div>
        <div>
          <b>species:</b>{' '}
        </div>
        <div>
          <b>location:</b>{' '}
        </div>
      </div>
    </div>
  );
};

export default RideItem;
