import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchDragonsIfNeeded } from '../../redux/actions/dragons';
import { dragonById } from '../../redux/reducers/dragons';
import { numberFormatter, shortDateFormatter } from '../../helpers/formatters';

export const DragonInfo = ({ dragon, dragonId }) => {
  if (!dragonId) throw new Error('Dragon ID is not defined');

  const mass = numberFormatter.format(Math.round(dragon.dry_mass_kg / 10) / 100);

  return (
    <div>
      <h2>
        Full info about
        {' '}
        {dragon.name}
      </h2>
      <dl>
        <dt>Active:</dt>
        <dd>{dragon.active ? 'Yes' : 'No'}</dd>

        <dt>Crew capacity</dt>
        <dd>{dragon.crew_capacity}</dd>

        <dt>Dry mass</dt>
        <dd>{`${mass} tons`}</dd>

        <dt>Height with trunk:</dt>
        <dd>{`${dragon.height_w_trunk.meters} m.`}</dd>

        <dt>Diameter:</dt>
        <dd>{`${dragon.diameter.meters} m.`}</dd>

        <dt>First flight:</dt>
        <dd>{dragon.first_flight ? shortDateFormatter.format(new Date(dragon.first_flight)) : '-'}</dd>
      </dl>

      <p>{dragon.description}</p>
      <p>
        Read more on
        {' '}
        <a href={dragon.wikipedia}>Wikipedia</a>
      </p>
    </div>
  );
};
DragonInfo.propTypes = {
  dragon: PropTypes.instanceOf(Object).isRequired,
  dragonId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.dragons.state,
  dragon: dragonById(state.dragons.data, ownProps.dragonId),
});

export default withLoader(DragonInfo, mapStateToProps, { fetchMethod: fetchDragonsIfNeeded });
