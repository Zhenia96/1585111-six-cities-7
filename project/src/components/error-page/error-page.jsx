import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath } from '../../constant.js';
import './style.css';

export default function ErrorPage() {


  return (
    <div className='error-page'>
      <h1 className='error-page__title'>Error 404</h1>
      <Link className='error-page__link' to={AppPath.MAIN}>Go to main page</Link>
    </div>
  );
}
