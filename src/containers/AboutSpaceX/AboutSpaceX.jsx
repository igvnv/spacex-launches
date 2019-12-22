import React from 'react';
import PropTypes from 'prop-types';

import { numberFormatter, priceFormatter } from '../../helpers/formatters';
import withLoader from '../../hoc/withLoader';
import { fetchAboutCompanyDataIfNeeded } from '../../redux/actions';

/* eslint camelcase: 0 */
export function AboutSpaceX({ data }) {
  if (!data) return null;

  const {
    name,
    founder,
    founded,
    employees,
    vehicles,
    launch_sites,
    test_sites,
    ceo,
    cto,
    coo,
    cto_propulsion,
    valuation,
    headquarters,
    summary,
  } = data;

  return (
    <div>
      <h1 className="title title_level_1">About SpaceX</h1>

      <p className="paragraph">{summary}</p>

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Company name: </dt>
        <dd className="description-list__description">{name}</dd>

        <dt className="description-list__title">Founder:</dt>
        <dd className="description-list__description">{founder}</dd>

        <dt className="description-list__title">Founded:</dt>
        <dd className="description-list__description">{founded}</dd>

        <dt className="description-list__title">Employees:</dt>
        <dd className="description-list__description">
          {numberFormatter.format(employees)}
        </dd>

        <dt className="description-list__title">Vehicles:</dt>
        <dd className="description-list__description">
          {numberFormatter.format(vehicles)}
        </dd>

        <dt className="description-list__title">Launch sites:</dt>
        <dd className="description-list__description">
          {numberFormatter.format(launch_sites)}
        </dd>

        <dt className="description-list__title">Test sites:</dt>
        <dd className="description-list__description">
          {numberFormatter.format(test_sites)}
        </dd>

        <dt className="description-list__title">CEO:</dt>
        <dd className="description-list__description">{ceo}</dd>

        <dt className="description-list__title">CTO:</dt>
        <dd className="description-list__description">{cto}</dd>

        <dt className="description-list__title">COO:</dt>
        <dd className="description-list__description">{coo}</dd>

        <dt className="description-list__title">COO propulsion:</dt>
        <dd className="description-list__description">{cto_propulsion}</dd>

        <dt className="description-list__title">Valuation:</dt>
        <dd className="description-list__description">
          {priceFormatter.format(valuation)}
        </dd>

        <dt className="description-list__title">Headquarters:</dt>
        <dd className="description-list__description">
          {headquarters.address}
          <br />
          {headquarters.city}
          {', '}
          {headquarters.state}
        </dd>
      </dl>
    </div>
  );
}
AboutSpaceX.defaultProps = {
  data: null,
};

AboutSpaceX.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    founder: PropTypes.string.isRequired,
    founded: PropTypes.number.isRequired,
    employees: PropTypes.number.isRequired,
    vehicles: PropTypes.number.isRequired,
    launch_sites: PropTypes.number.isRequired,
    test_sites: PropTypes.number.isRequired,
    ceo: PropTypes.string.isRequired,
    cto: PropTypes.string.isRequired,
    coo: PropTypes.string.isRequired,
    cto_propulsion: PropTypes.string.isRequired,
    valuation: PropTypes.number.isRequired,
    headquarters: PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
    summary: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  loadingState: state.aboutCompany.state,
  data: state.aboutCompany.data,
});

export default withLoader(AboutSpaceX, mapStateToProps, {
  fetchMethod: fetchAboutCompanyDataIfNeeded,
});
