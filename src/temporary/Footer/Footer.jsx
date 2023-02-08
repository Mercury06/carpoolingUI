import React, { useEffect, useState } from 'react';
import { AiFillAmazonCircle, AiFillChrome, AiFillFacebook } from 'react-icons/ai';

import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <AiFillAmazonCircle />
      <AiFillChrome />
      <AiFillFacebook />
      2023
    </footer>
  );
};

export default Footer;
