import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchDragonsIfNeeded } from '../../redux/actions/dragons';
import DragonInfoShort from '../../components/DragonInfoShort';

export const Dragons = ({ dragons }) => (
  <div className="catalog-list">
    {dragons.map((dragon) => (
      <div className="catalog-list__item" key={dragon.id}>
        <DragonInfoShort dragonId={dragon.id} />
      </div>
    ))}
  </div>
);
Dragons.propTypes = {
  dragons: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.dragons.state,
  dragons: state.dragons.data,
});

export default withLoader(Dragons, mapStateToProps, { fetchMethod: fetchDragonsIfNeeded });
