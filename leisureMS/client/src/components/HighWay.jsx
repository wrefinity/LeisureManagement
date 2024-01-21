
import React, { Fragment } from 'react';
import highway from '../assets/img/highway.jpeg';

const HighWay = () => {
  return (
    <Fragment>
      <div className='pathy'>
        <div className='pathy-left'>
          <h1> Path to Leisure 
            <br/>
            <span> Walk with us</span>
          </h1>
        </div>
        <div className='pathy-right'>
          <img
            src={highway}
            alt='Welcomex'
            className='d-inline-block align-top'
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HighWay;

