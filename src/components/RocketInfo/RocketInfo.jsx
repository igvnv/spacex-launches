import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchRocketsIfNeeded } from '../../redux/actions/rockets';
import { rocketById } from '../../redux/reducers/rockets';
import { numberFormatter, priceFormatter } from '../../helpers/formatters';
import Payloads from './Payloads';

export const RocketInfo = ({ rocket, rocketId }) => {
  if (!rocketId) throw new Error('Rocket ID is not defined');

  const mass = numberFormatter.format(Math.round(rocket.mass.kg / 10) / 100);

  return (
    <div>
      <h2>
        Full info about
        {' '}
        {rocket.rocket_name}
      </h2>
      <dl>
        <dt>Active:</dt>
        <dd>{rocket.active ? 'Yes' : 'No'}</dd>

        <dt>Cost per launch</dt>
        <dd>{priceFormatter.format(rocket.cost_per_launch)}</dd>

        <dt>Height:</dt>
        <dd>{`${rocket.height.meters} m.`}</dd>

        <dt>Diameter:</dt>
        <dd>{`${rocket.diameter.meters} m.`}</dd>

        <dt>Mass:</dt>
        <dd>{`${mass} tonnes`}</dd>

        <dt>Payload weights</dt>
        <dd>
          <ul>
            {rocket.payload_weights.map((payload) => (
              <li key={payload.id}>
                <strong>{`${payload.name}: `}</strong>
                {numberFormatter.format(payload.kg)}
                {' '}
                kg
              </li>
            ))}
          </ul>
        </dd>

        <dt>Stages</dt>
        <dd>{rocket.stages}</dd>

        <dt>First stage</dt>
        <dd>
          <dl>
            <dt>Reusable</dt>
            <dd>{rocket.first_stage.reusable ? 'Yes' : 'No'}</dd>

            <dt>Engines</dt>
            <dd>{rocket.first_stage.engines}</dd>

            <dt>Fuel amount</dt>
            <dd>{`${rocket.first_stage.fuel_amount_tons} tons`}</dd>

            <dt>Burn time</dt>
            <dd>{`${rocket.first_stage.burn_time_sec} sec`}</dd>
          </dl>
        </dd>

        <dt>Second stage</dt>
        <dd>
          <dl>
            <dt>Engines</dt>
            <dd>{rocket.second_stage.engines}</dd>

            <dt>Fuel amount</dt>
            <dd>{`${rocket.second_stage.fuel_amount_tons} tons`}</dd>

            <dt>Burn time</dt>
            <dd>{`${rocket.second_stage.burn_time_sec} sec`}</dd>

            <dt>Payloads</dt>
            <dd>
              <Payloads data={rocket.second_stage.payloads} />
            </dd>
          </dl>
        </dd>

        {rocket.landing_legs && rocket.landing_legs.number > 0 && (
          <>
            <dt>Landing legs</dt>
            <dd>
              {rocket.landing_legs.number}
              {' x '}
              {rocket.landing_legs.material}
            </dd>
          </>
        )}
      </dl>

      <p>{rocket.description}</p>
      <p>
        Read more on
        {' '}
        <a href={rocket.wikipedia}>Wikipedia</a>
      </p>
    </div>
  );
};
RocketInfo.propTypes = {
  rocket: PropTypes.instanceOf(Object).isRequired,
  rocketId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.rockets.state,
  rocket: rocketById(state.rockets.data, ownProps.rocketId),
});

export default withLoader(RocketInfo, mapStateToProps, { fetchMethod: fetchRocketsIfNeeded });
