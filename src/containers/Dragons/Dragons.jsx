import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchDragonsIfNeeded } from '../../redux/actions/dragons';
import DragonInfoShort from '../../components/DragonInfoShort';
import Toggle from '../../components/Toggle';

export const Dragons = ({ dragons }) => {
  const [activeOnly, setActiveOnly] = useState(false);

  const filterDragons = (dragonsList) => {
    if (!activeOnly) return dragonsList;
    return dragonsList.filter((r) => r.active === true);
  };

  return (
    <div>
      <div className="catalog-filter">
        <Toggle label="Active only" value={activeOnly} onToggle={setActiveOnly} />
      </div>

      <div className="catalog-list">
        {filterDragons(dragons).map((dragon) => (
          <div className="catalog-list__item" key={dragon.id}>
            <DragonInfoShort dragonId={dragon.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
Dragons.propTypes = {
  dragons: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.dragons.state,
  dragons: state.dragons.data,
});

export default withLoader(Dragons, mapStateToProps, { fetchMethod: fetchDragonsIfNeeded });
