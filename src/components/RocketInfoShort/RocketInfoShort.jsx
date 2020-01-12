import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchRocketsIfNeeded } from '../../store/actions/rockets';
import { rocketById } from '../../store/reducers/rockets';
import { numberFormatter } from '../../helpers/formatters';

export const RocketInfoShort = ({ rocket, rocketId }) => {
  const mass = numberFormatter.format(Math.round(rocket.mass.kg / 10) / 100);

  return (
    <div>
      <h2 className="title title_level_2 catalog-list__title">
        {rocket.rocket_name}
      </h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">
          {rocket.active ? 'Yes' : 'No'}
        </dd>

        <dt className="description-list__title">Height:</dt>
        <dd className="description-list__description">{`${rocket.height.meters} m.`}</dd>

        <dt className="description-list__title">Diameter:</dt>
        <dd className="description-list__description">{`${rocket.diameter.meters} m.`}</dd>

        <dt className="description-list__title">Mass:</dt>
        <dd className="description-list__description">{`${mass} tonnes`}</dd>
      </dl>

      <p>
        <Link to={`/catalog/rockets/${rocketId}`} className="accent-link">
          Read more
          <span className="accent-link__arrow" />
        </Link>
      </p>
    </div>
  );
};
RocketInfoShort.propTypes = {
  rocket: PropTypes.instanceOf(Object).isRequired,
  rocketId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.rockets.state,
  rocket: rocketById(state.rockets.data, ownProps.rocketId),
});

export default withLoader(RocketInfoShort, mapStateToProps, {
  fetchMethod: fetchRocketsIfNeeded,
});
