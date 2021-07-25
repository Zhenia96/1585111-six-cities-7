import React, { useState } from 'react';
import { SortType } from '../../constant.js';
import { changeSortType } from '../../store/action.js';
import { useDispatch, useSelector } from 'react-redux';
import { getSortType } from '../../store/other/selectors';

const SORT_ITEM_ACTIVE = 'places__option--active';
const SORT_LIST_OPENED = 'places__options--opened';

function setOptionActiveClass(sortType, currentSortType) {
  return sortType === currentSortType ? SORT_ITEM_ACTIVE : '';
}

export default function SortMenu() {
  const [showStatus, setShowStatus] = useState(false);

  const sortType = useSelector(getSortType);

  const dispatch = useDispatch();

  function handleSortMenuClick() {
    return setShowStatus(!showStatus);
  }

  function handleOptionsClick(evt) {
    evt.preventDefault();
    if (!evt.target.children.length) {
      dispatch(changeSortType(evt.target.textContent));
    }
    setShowStatus(!showStatus);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleSortMenuClick}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${showStatus ? SORT_LIST_OPENED : ''}`} onClick={handleOptionsClick}>
        <li className={`places__option ${setOptionActiveClass(SortType.POPULAR, sortType)}`} tabIndex="0">Popular</li>
        <li className={`places__option ${setOptionActiveClass(SortType.PRICE_LOW_TO_HIGH, sortType)}`} tabIndex="0">Price: low to high</li>
        <li className={`places__option ${setOptionActiveClass(SortType.PRICE_HIGH_TO_LOW, sortType)}`} tabIndex="0">Price: high to low</li>
        <li className={`places__option ${setOptionActiveClass(SortType.RAITING_HIGH_TO_LOW, sortType)}`} tabIndex="0">Top rated first</li>
      </ul>
    </form>
  );
}
