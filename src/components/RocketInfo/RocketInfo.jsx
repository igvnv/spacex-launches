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
      <h1 className="title title_level_1">{rocket.rocket_name}</h1>

      <p className="paragraph">{rocket.description}</p>

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">{rocket.active ? 'Yes' : 'No'}</dd>

        <dt className="description-list__title">Cost per launch</dt>
        <dd className="description-list__description">{priceFormatter.format(rocket.cost_per_launch)}</dd>

        <dt className="description-list__title">Height:</dt>
        <dd className="description-list__description">{`${rocket.height.meters} m.`}</dd>

        <dt className="description-list__title">Diameter:</dt>
        <dd className="description-list__description">{`${rocket.diameter.meters} m.`}</dd>

        <dt className="description-list__title">Mass:</dt>
        <dd className="description-list__description">{`${mass} tonnes`}</dd>

        <dt className="description-list__title">Payload weights</dt>
        <dd className="description-list__description">
          <ul className="list">
            {rocket.payload_weights.map((payload) => (
              <li key={payload.id} className="list__item">
                {`${payload.name}: `}
                {`${numberFormatter.format(payload.kg)} kg`}
              </li>
            ))}
          </ul>
        </dd>

        <dt className="description-list__title">Stages</dt>
        <dd className="description-list__description">{rocket.stages}</dd>

        <dt className="description-list__title">First stage</dt>
        <dd className="description-list__description">
          <dl className="description-list description-list_narrow">
            <dt className="description-list__title">Reusable</dt>
            <dd className="description-list__description">{rocket.first_stage.reusable ? 'Yes' : 'No'}</dd>

            <dt className="description-list__title">Engines</dt>
            <dd className="description-list__description">{rocket.first_stage.engines}</dd>

            <dt className="description-list__title">Fuel amount</dt>
            <dd className="description-list__description">{`${rocket.first_stage.fuel_amount_tons} tons`}</dd>

            <dt className="description-list__title">Burn time</dt>
            <dd className="description-list__description">{`${rocket.first_stage.burn_time_sec} sec`}</dd>
          </dl>
        </dd>

        <dt className="description-list__title">Second stage</dt>
        <dd className="description-list__description">
          <dl className="description-list description-list_narrow">
            <dt className="description-list__title">Engines</dt>
            <dd className="description-list__description">{rocket.second_stage.engines}</dd>

            <dt className="description-list__title">Fuel amount</dt>
            <dd className="description-list__description">{`${rocket.second_stage.fuel_amount_tons} tons`}</dd>

            <dt className="description-list__title">Burn time</dt>
            <dd className="description-list__description">{`${rocket.second_stage.burn_time_sec} sec`}</dd>

            <dt className="description-list__title">Payloads</dt>
            <dd className="description-list__description">
              <Payloads data={rocket.second_stage.payloads} />
            </dd>
          </dl>
        </dd>

        {rocket.landing_legs && rocket.landing_legs.number > 0 && (
          <>
            <dt className="description-list__title">Landing legs</dt>
            <dd className="description-list__description">
              {rocket.landing_legs.number}
              {' x '}
              {rocket.landing_legs.material}
            </dd>
          </>
        )}
      </dl>

      <p className="paragraph">
        Read more on
        {' '}
        <a className="link" href={rocket.wikipedia}>Wikipedia</a>
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
