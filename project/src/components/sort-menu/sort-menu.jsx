import React, { useState } from 'react';
import { SortType } from '../../constant.js';
import { actionCreator } from '../../store/action.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SORT_OPTION_ACTIVE = 'places__option--active';
const SORT_OPTIONS_OPENED = 'places__options--opened';

function setOptionActiveClass(sortType, currentSortType) {
  return sortType === currentSortType ? SORT_OPTION_ACTIVE : '';
}

function mapStateToProps(state) {
  return {
    sortType: state.sortType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeSortType: (sortType) => (
      dispatch(actionCreator.changeSortType(sortType))
    ),
  };
}

function SortMenu({ sortType, onChangeSortType }) {
  const [showStatus, setShowStatus] = useState(false);

  function handleSortMenuClick() {
    return setShowStatus(!showStatus);
  }

  function handleOptionsClick(evt) {
    evt.preventDefault();
    if (!evt.target.children.length) {
      onChangeSortType(evt.target.textContent);
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
      <ul className={`places__options places__options--custom ${showStatus ? SORT_OPTIONS_OPENED : ''}`} onClick={handleOptionsClick}>
        <li className={`places__option ${setOptionActiveClass(SortType.POPULAR, sortType)}`} tabIndex="0">Popular</li>
        <li className={`places__option ${setOptionActiveClass(SortType.PRICE_LOW_TO_HIGH, sortType)}`} tabIndex="0">Price: low to high</li>
        <li className={`places__option ${setOptionActiveClass(SortType.PRICE_HIGH_TO_LOW, sortType)}`} tabIndex="0">Price: high to low</li>
        <li className={`places__option ${setOptionActiveClass(SortType.RAITING_HIGH_TO_LOW, sortType)}`} tabIndex="0">Top rated first</li>
      </ul>
    </form>
  );
}

SortMenu.propTypes = {
  sortType: PropTypes.string.isRequired,
  onChangeSortType: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortMenu);
