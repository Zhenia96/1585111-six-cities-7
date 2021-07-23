import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMessage } from '../../store/other/selectors';
import { setErrorMessage } from '../../store/action';
import './style.css';

const MESSAGE_TIMEOUT = 2000;

export default function Error() {
  const errorMessage = useSelector(getErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUmount = false;

    setTimeout(() => {
      if (!isUmount && errorMessage !== '') {
        dispatch(setErrorMessage(''));
      }
    }, MESSAGE_TIMEOUT);

    return () => isUmount = true;
  });

  return (
    <div className='error' hidden={!errorMessage}>
      <p className='error__text'>{errorMessage}</p>
    </div>
  );
}
