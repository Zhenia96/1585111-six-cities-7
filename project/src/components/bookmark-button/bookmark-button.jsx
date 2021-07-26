import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppPath, AuthorizationStatus, ClassName, ServerPath } from '../../constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getHotels } from '../../store/hotels/selectors';
import { Redirect } from 'react-router-dom';
import { changeFavoriteStatus, setErrorMessage } from '../../store/action';
import { useContext } from 'react';
import { ApiContext } from '../../context/context.js';

function getIconWidth(parentClassName) {
  switch (parentClassName) {
    case ClassName.PROPERTY:
      return 31;
    default:
      return 18;
  }
}

function getIconHeight(parentClassName) {
  switch (parentClassName) {
    case ClassName.PROPERTY:
      return 33;
    default:
      return 19;
  }
}

export default function BookmarkButton({ isFavorite, id, parentClassName }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [isActive, setIsActive] = useState(isFavorite);

  const api = useContext(ApiContext);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const hotels = useSelector(getHotels);

  const dispatch = useDispatch();

  function handleButtonClick() {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      setRedirectToLogin(true);
      return;
    }
    setIsLoaded(false);
    api.post(`${ServerPath.FAVORITE}/${id}/${isActive ? 0 : 1}`)
      .then(() => {
        if (hotels.length) {
          dispatch(changeFavoriteStatus(id));
        }
        setIsLoaded(true);
        setIsActive(!isActive);
      })
      .catch(({ response }) => {
        dispatch(setErrorMessage(response.statusText));
        setIsLoaded(true);
      });
  }

  if (redirectToLogin) {
    return <Redirect to={AppPath.LOGIN} />;
  }

  return (
    <button className={`${parentClassName}__bookmark-button ${isActive ? `${parentClassName}__bookmark-button--active` : ''} button`} type="button" disabled={!isLoaded} onClick={handleButtonClick}>
      <svg className={`${parentClassName}__bookmark-icon`} width={getIconWidth(parentClassName)} height={getIconHeight(parentClassName)}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button >
  );
}

BookmarkButton.propTypes = {
  parentClassName: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
