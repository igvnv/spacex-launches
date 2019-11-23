import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LandingPadInfoShort } from './LandingPadInfoShort';
import landingPadsData from '../../../__tests__/data/landingpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPadInfoShort', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <LandingPadInfoShort
        landingPadId={landingPadsData[0].id}
        landingPad={landingPadsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
