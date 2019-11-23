import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LaunchesTimetable from './LaunchesTimetable';
import NoLaunchesFound from '../NoLaunchesFound';
import TimetablePopup from '../TimetablePopup';
import TimetableYear from './TimetableYear';

import launchesList from '../../../__tests__/data/launches';

Enzyme.configure({ adapter: new Adapter() });

describe('LaunchesTimetable', () => {
  it('displays NoLaunchesFound when launches are empty list', () => {
    const wrapper = shallow(<LaunchesTimetable launches={[]} />);
    expect(wrapper.find(NoLaunchesFound).length).toBe(1);
  });

  it('contains TimetablePopup', () => {
    const wrapper = shallow(<LaunchesTimetable launches={launchesList} />);
    expect(wrapper.find(TimetablePopup).length).toBe(1);
  });

  it('contains TimetablePopup', () => {
    const wrapper = shallow(<LaunchesTimetable launches={launchesList} />);
    expect(wrapper.find(TimetableYear).length).toBe(15);
  });
});
