import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CityContainer from '../city-container/city-container.jsx';
import PageHeader from '../page-header/page-header.jsx';
import { City } from '../../constant.js';
import { sortHotels } from '../../utils/common.js';
import { actionCreator } from '../../store/action.js';
import { connect } from 'react-redux';

function setActiveClass(checkedCity, city) {
  return checkedCity === city ? 'tabs__item--active' : '';
}

function filterHotels(hotels, city) {
  return hotels.filter((hotel) => hotel.city.name === city);
}

function mapStateToProps(state) {
  return {
    city: state.city,
    sortType: state.sortType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeCity: (city) => (
      dispatch(actionCreator.changeCity(city))
    ),
  };
}

function MainPage({ hotels, user, city, onChangeCity, sortType }) {

  const [activeHotel, setActiveHotel] = useState(null);
  const [emptyStatus, setEmptyStatus] = useState(false);

  const filteredHotels = filterHotels(hotels, city);

  function changeCity(evt) {
    evt.preventDefault();
    if (!evt.target.children.length) {
      onChangeCity(evt.target.textContent);
    }
  }

  return (
    <div className="page page--gray page--main">
      <PageHeader user={user} />
      <main className={`page__main page__main--index ${!emptyStatus ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" onClick={changeCity}>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.PARIS)}`} href="/">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.COLOGNE)}`} href="/">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.BRUSSELS)}`} href="/">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.AMSTERDAM)}`} href="/">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.HAMBURG)}`} href="/">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className={`locations__item-link tabs__item ${setActiveClass(city, City.DUSSELDORF)}`} href="/">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <CityContainer hotels={sortHotels(filteredHotels, sortType)} city={city} onCardMouseOver={setActiveHotel} activeHotel={activeHotel} changeEmptyStatus={setEmptyStatus} />
        </div>
      </main>
    </div>);
}

MainPage.propTypes = {
  hotels: PropTypes.array.isRequired,
  user: PropTypes.object,
  city: PropTypes.string.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
