import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import { numberFormatter, priceFormatter } from '../../helpers/formatters';
import withLoader, {
  WithLoaderDispatchProps,
  WithLoaderStateProps,
} from '../../hoc/withLoader';
import { fetchAboutCompanyDataIfNeeded } from '../../store/actions';
import AboutCompany from '../../models/about-company';
import { AppState, AppActions } from '../../store/reducers';

type AboutSpaceXProps = {
  info: AboutCompany;
  children: never;
};

export function AboutSpaceX(props: AboutSpaceXProps) {
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
  } = props.info;

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

type LinkStateProp = WithLoaderStateProps & {
  info: AboutCompany | null;
};

const mapStateToProps = (state: AppState): LinkStateProp => ({
  loadingState: state.aboutCompany.state,
  info: state.aboutCompany.data,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, AppActions>
): WithLoaderDispatchProps => ({
  fetchMethod: bindActionCreators(fetchAboutCompanyDataIfNeeded, dispatch),
});

export default withLoader(AboutSpaceX, mapStateToProps, mapDispatchToProps);
