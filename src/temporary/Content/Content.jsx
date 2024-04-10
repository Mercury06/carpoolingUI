import React, { useEffect, useState } from 'react';
import { AiFillAmazonCircle, AiFillChrome, AiFillFacebook } from 'react-icons/ai';

import s from './Content.module.scss';

const Content = () => {
  return (    
      <div className={s.timeline}>
        <h1>Vertical timeline</h1>
        <ul>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
          <li>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non tempora voluptas enim, nulla optio architecto minus, aspernatur deleniti in eos ex voluptatum culpa vitae ad? Cupiditate aut eos eveniet aspernatur.</p>
            </div>
          </li>
        </ul>
      </div>   
  
  )
};

export default Content;
