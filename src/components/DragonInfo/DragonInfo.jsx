import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchDragonsIfNeeded } from '../../redux/actions/dragons';
import { dragonById } from '../../redux/reducers/dragons';
import { numberFormatter, shortDateFormatter } from '../../helpers/formatters';

export const DragonInfo = ({ dragon, dragonId }) => {
  if (!dragonId) throw new Error('Dragon ID is not defined');

  const mass = numberFormatter.format(
    Math.round(dragon.dry_mass_kg / 10) / 100
  );

  return (
    <div>
      <h1 className="title title_level_1">{dragon.name}</h1>

      <p className="paragraph">{dragon.description}</p>

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">
          {dragon.active ? 'Yes' : 'No'}
        </dd>

        <dt className="description-list__title">Crew capacity</dt>
        <dd className="description-list__description">
          {dragon.crew_capacity}
        </dd>

        <dt className="description-list__title">Dry mass</dt>
        <dd className="description-list__description">{`${mass} tons`}</dd>

        <dt className="description-list__title">Height with trunk:</dt>
        <dd className="description-list__description">{`${dragon.height_w_trunk.meters} m.`}</dd>

        <dt className="description-list__title">Diameter:</dt>
        <dd className="description-list__description">{`${dragon.diameter.meters} m.`}</dd>

        <dt className="description-list__title">First flight:</dt>
        <dd className="description-list__description">
          {dragon.first_flight
            ? shortDateFormatter.format(new Date(dragon.first_flight))
            : '-'}
        </dd>
      </dl>

      <p className="paragraph">
        Read more on{' '}
        <a className="link" href={dragon.wikipedia}>
          Wikipedia
        </a>
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

export default withLoader(DragonInfo, mapStateToProps, {
  fetchMethod: fetchDragonsIfNeeded,
});
