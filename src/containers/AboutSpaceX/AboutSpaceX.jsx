import React from 'react';
import PropTypes from 'prop-types';

import { numberFormatter, priceFormatter } from '../../helpers/formatters';
import withLoader from '../../hoc/withLoader';
import { fetchAboutCompanyDataIfNeeded } from '../../redux/actions';

/* eslint camelcase: 0 */
export function AboutSpaceX({ data }) {
  if (!data) return null;

  const {
    name, founder, founded, employees, vehicles, launch_sites, test_sites, ceo, cto, coo,
    cto_propulsion, valuation, headquarters, summary,
  } = data;

  return (
    <div>
      <dl>
        <dt>Company name: </dt>
        <dd>{ name }</dd>

        <dt>Founder:</dt>
        <dd>{ founder }</dd>

        <dt>Founded:</dt>
        <dd>{ founded }</dd>

        <dt>Employees:</dt>
        <dd>{ numberFormatter.format(employees) }</dd>

        <dt>Vehicles:</dt>
        <dd>{ numberFormatter.format(vehicles) }</dd>

        <dt>Launch sites:</dt>
        <dd>{ numberFormatter.format(launch_sites) }</dd>

        <dt>Test sites:</dt>
        <dd>{ numberFormatter.format(test_sites) }</dd>

        <dt>CEO</dt>
        <dd>{ ceo }</dd>

        <dt>CTO</dt>
        <dd>{ cto }</dd>

        <dt>COO</dt>
        <dd>{ coo }</dd>

        <dt>COO propulsion</dt>
        <dd>{ cto_propulsion }</dd>

        <dt>Valuation:</dt>
        <dd>{ priceFormatter.format(valuation) }</dd>

        <dt>Headquarters</dt>
        <dd>
          { headquarters.address }
          <br />
          { headquarters.city }
          ,
          { headquarters.state }
        </dd>
      </dl>

      <p>{ summary }</p>
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

export default withLoader(
  AboutSpaceX,
  mapStateToProps,
  { fetchMethod: fetchAboutCompanyDataIfNeeded },
);
