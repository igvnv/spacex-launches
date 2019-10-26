import React from 'react';

import { numberFormatter, priceFormatter } from '../../helpers/formatters';
import withLoader from '../../hoc/withLoader';
import { fetchAboutCompanyDataIfNeeded } from '../../redux/actions';

export function ABoutSpaceX({data}) {
  if (!Object.keys(data).length) return null;

  return (
    <div>
      <dl>
        <dt>Company name: </dt>
        <dd>{data.name}</dd>

        <dt>Founder:</dt>
        <dd>{data.founder}</dd>

        <dt>Founded:</dt>
        <dd>{data.founded}</dd>

        <dt>Employees:</dt>
        <dd>{numberFormatter.format(data.employees)}</dd>

        <dt>Vehicles:</dt>
        <dd>{numberFormatter.format(data.vehicles)}</dd>

        <dt>Launch sites:</dt>
        <dd>{numberFormatter.format(data.launch_sites)}</dd>

        <dt>Test sites:</dt>
        <dd>{numberFormatter.format(data.test_sites)}</dd>

        <dt>CEO</dt>
        <dd>{data.ceo}</dd>

        <dt>CTO</dt>
        <dd>{data.cto}</dd>

        <dt>COO</dt>
        <dd>{data.coo}</dd>

        <dt>COO propulsion</dt>
        <dd>{data.cto_propulsion}</dd>

        <dt>Valuation:</dt>
        <dd>{priceFormatter.format(data.valuation)}</dd>

        <dt>Headquarters</dt>
        <dd>
          {data.headquarters.address}<br />
          {data.headquarters.city}, {data.headquarters.state}
        </dd>
      </dl>

      <p>{data.summary}</p>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loadingState: state.aboutCompany.state,
    data: state.aboutCompany.data,
  };
};

export default withLoader(ABoutSpaceX, mapStateToProps, {fetchMethod: fetchAboutCompanyDataIfNeeded});