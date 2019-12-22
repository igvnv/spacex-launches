import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import { landingPadById } from '../../redux/reducers/landingPads';

export const LandingPadInfoShort = ({ landingPad, landingPadId }) => (
  <div>
    <h2 className="title title_level_2 catalog-list__title">
      {landingPad.full_name}
    </h2>

    <dl className="description-list">
      <dt className="description-list__title">Status:</dt>
      <dd className="description-list__description">{landingPad.status}</dd>

      <dt className="description-list__title">Attempted landings</dt>
      <dd className="description-list__description">
        {landingPad.attempted_landings}
      </dd>

      <dt className="description-list__title">Successful landings</dt>
      <dd className="description-list__description">
        {landingPad.successful_landings}
      </dd>
    </dl>

    <p>
      <Link
        to={`/catalog/landing_pads/${landingPadId}`}
        className="accent-link"
      >
        Read more
        <span className="accent-link__arrow" />
      </Link>
    </p>
  </div>
);
LandingPadInfoShort.propTypes = {
  landingPad: PropTypes.instanceOf(Object).isRequired,
  landingPadId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.landingPads.state,
  landingPad: landingPadById(state.landingPads.data, ownProps.landingPadId),
});

export default withLoader(LandingPadInfoShort, mapStateToProps, {
  fetchMethod: fetchLandingPadsIfNeeded,
});
