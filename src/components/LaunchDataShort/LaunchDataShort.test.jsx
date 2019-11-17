import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LaunchDataShort from './LaunchDataShort';
import { successfulLaunch, unsuccessfulLaunch } from '../../../__tests__/helpers/launches';

Enzyme.configure({ adapter: new Adapter() });

describe('LaunchDataShort', () => {
  it('displays nothing when launch is not defined', () => {
    const wrapper = shallow(<LaunchDataShort />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('displays launch mission name as title', () => {
    const wrapper = shallow(<LaunchDataShort launch={successfulLaunch} />);
    expect(wrapper.find('.launch-data-short__title').first().text()).toBe(successfulLaunch.mission_name);
  });

  it('displays failure details for unseccessfully launch', () => {
    const wrapper = shallow(<LaunchDataShort launch={unsuccessfulLaunch} />);
    expect(wrapper.find('.launch-data-short__failure-details').length).toBe(1);
  });
});
