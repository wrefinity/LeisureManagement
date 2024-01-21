import React, { Fragment } from 'react';
import bed from '../assets/img/bed.jpg';

const BreadCumb = () => {
  return (
    <Fragment>
      <div className='bread'>
        <div className='bread-left'>
          <h1> Making Your Reservation 
            <br/>
            <span> Now</span>
          </h1>
        </div>
        <div className='bread-right'>
          <img
            src={bed}
            alt='Welcomex'
            className='d-inline-block align-top'
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BreadCumb;
