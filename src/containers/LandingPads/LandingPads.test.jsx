import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LandingPads } from './LandingPads';
import LandingPadInfoShort from '../../components/LandingPadInfoShort';
import landingPadsData from '../../../__tests__/data/landingpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPads', () => {
  it('displays short info about all landing pads', () => {
    const wrapper = shallow(<LandingPads landingPads={landingPadsData} />);
    expect(wrapper.find(LandingPadInfoShort).length).toEqual(
      landingPadsData.length
    );
  });
});
