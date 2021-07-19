import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CityContainer from '../city-container/city-container.jsx';
import PageHeader from '../page-header/page-header.jsx';
import { City } from '../../constant.js';
import { sortHotels } from '../../utils/common.js';
import { changeCity } from '../../store/action.js';
import { connect } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import { getCity, getSortType } from '../../store/other/selectors';
import { getHotelsLoadingStatus } from '../../store/hotels/selectors';

function setActiveClass(checkedCity, city) {
  return checkedCity === city ? 'tabs__item--active' : '';
}

function filterHotels(hotels, city) {
  return hotels.filter((hotel) => hotel.city.name === city);
}

function mapStateToProps(state) {
  return {
    city: getCity(state),
    sortType: getSortType(state),
    hotelsLoadingStatus: getHotelsLoadingStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeCity: (city) => (
      dispatch(changeCity(city))
    ),
  };
}

function MainPage({ hotels, city, onChangeCity, sortType, hotelsLoadingStatus }) {

  const [activeHotel, setActiveHotel] = useState(null);
  const [emptyStatus, setEmptyStatus] = useState(false);

  const filteredHotels = filterHotels(hotels, city);

  function handleCityChange(evt) {
    evt.preventDefault();
    if (!evt.target.children.length) {
      onChangeCity(evt.target.textContent);
    }
  }

  return (
    <div className="page page--gray page--main">
      <PageHeader />
      <main className={`page__main page__main--index ${!emptyStatus ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" onClick={handleCityChange}>
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
          {hotelsLoadingStatus ?
            <CityContainer hotels={sortHotels(filteredHotels, sortType)} city={city} onCardMouseOver={setActiveHotel} activeHotel={activeHotel} changeEmptyStatus={setEmptyStatus} /> :
            <LoadingScreen />}
        </div>
      </main>
    </div>);
}

MainPage.propTypes = {
  hotels: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  hotelsLoadingStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
