import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader.tsx';
import { fetchDragonsIfNeeded } from '../../store/actions/dragons';
import { dragonById } from '../../store/reducers/dragons';
import { shortDateFormatter } from '../../helpers/formatters';

export const DragonInfoShort = ({ dragon, dragonId }) => {
  if (!dragon) return null;

  return (
    <div>
      <h2 className="title title_level_2 catalog-list__title">{dragon.name}</h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">
          {dragon.active ? 'Yes' : 'No'}
        </dd>

        <dt className="description-list__title">Crew capacity</dt>
        <dd className="description-list__description">
          {dragon.crew_capacity}
        </dd>

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

      <p>
        <Link to={`/catalog/dragons/${dragonId}`} className="accent-link">
          Read more
          <span className="accent-link__arrow" />
        </Link>
      </p>
    </div>
  );
};
DragonInfoShort.propTypes = {
  dragon: PropTypes.instanceOf(Object).isRequired,
  dragonId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.dragons.state,
  dragon: dragonById(state.dragons.data, ownProps.dragonId),
});

export default withLoader(DragonInfoShort, mapStateToProps, {
  fetchMethod: fetchDragonsIfNeeded,
});
