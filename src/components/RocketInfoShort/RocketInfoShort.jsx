import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchRocketsIfNeeded } from '../../redux/actions/rockets';
import { rocketById } from '../../redux/reducers/rockets';
import { numberFormatter } from '../../helpers/formatters';

export const RocketInfoShort = ({ rocket, rocketId }) => {
  const mass = numberFormatter.format(Math.round(rocket.mass.kg / 10) / 100);

  return (
    <div>
      <h2>{rocket.rocket_name}</h2>
      <dl>
        <dt>Active:</dt>
        <dd>{rocket.active ? 'Yes' : 'No'}</dd>

        <dt>Height:</dt>
        <dd>{`${rocket.height.meters} m.`}</dd>

        <dt>Diameter:</dt>
        <dd>{`${rocket.diameter.meters} m.`}</dd>

        <dt>Mass:</dt>
        <dd>{`${mass} tonnes`}</dd>
      </dl>

      <p>
        <Link to={`/catalog/rockets/${rocketId}`}>
          Read more!
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

export default withLoader(RocketInfoShort, mapStateToProps, { fetchMethod: fetchRocketsIfNeeded });
