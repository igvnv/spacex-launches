import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchPads } from './LaunchPads';
import LaunchPadInfoShort from '../../components/LaunchPadInfoShort';
import launchPadsData from '../../../__tests__/data/launchpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LaunchPads', () => {
  it('displays short info about all launch pads', () => {
    const wrapper = shallow(<LaunchPads launchPads={launchPadsData} />);
    expect(wrapper.find(LaunchPadInfoShort).length).toEqual(launchPadsData.length);
  });
});
