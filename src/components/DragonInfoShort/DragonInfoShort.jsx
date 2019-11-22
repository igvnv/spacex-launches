import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchDragonsIfNeeded } from '../../redux/actions/dragons';
import { dragonById } from '../../redux/reducers/dragons';
import { shortDateFormatter } from '../../helpers/formatters';

export const DragonInfoShort = ({ dragon, dragonId }) => {
  if (!dragon) return null;

  return (
    <div>
      <h2>{dragon.name}</h2>
      <dl>
        <dt>Active:</dt>
        <dd>{dragon.active ? 'Yes' : 'No'}</dd>

        <dt>Crew capacity</dt>
        <dd>{dragon.crew_capacity}</dd>

        <dt>Height with trunk:</dt>
        <dd>{`${dragon.height_w_trunk.meters} m.`}</dd>

        <dt>Diameter:</dt>
        <dd>{`${dragon.diameter.meters} m.`}</dd>

        <dt>First flight:</dt>
        <dd>{dragon.first_flight ? shortDateFormatter.format(new Date(dragon.first_flight)) : '-'}</dd>
      </dl>

      <p>
        <Link to={`/catalog/dragons/${dragonId}`}>
          Read more!
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

export default withLoader(DragonInfoShort, mapStateToProps, { fetchMethod: fetchDragonsIfNeeded });
