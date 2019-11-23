import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LandingPadInfo } from './LandingPadInfo';
import landingPadsData from '../../../__tests__/helpers/landingpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPadInfo', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <LandingPadInfo
        landingPadId={landingPadsData[0].id}
        landingPad={landingPadsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
