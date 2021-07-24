import React from 'react';
import PropTypes from 'prop-types';
import { ClassName } from '../../constant';

export default function PremiumMark({ parentClassName = ClassName.PLACE_CARD }) {
  return (
    <div className={`${parentClassName}__mark`}>
      <span>Premium</span>
    </div>
  );
}

PremiumMark.propTypes = {
  parentClassName: PropTypes.string,
};
