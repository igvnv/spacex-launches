import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LaunchesFilter from './LaunchesFilter';
import TimelineFilterButton from './TimelineFilterButton/TimelineFilterButton';
import FilterByYear from './FilterByYear';
import FilterByRocket from './FilterByRocket';
import FilterBySuccess from './FilterBySuccess';

Enzyme.configure({ adapter: new Adapter() });

describe('TimelineFilterButton', () => {
  it('contains three timeline buttons (past, all, future)', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find(TimelineFilterButton).length).toEqual(3);
    expect(
      wrapper
        .find(TimelineFilterButton)
        .at(0)
        .text()
    ).toEqual('Past launches');
    expect(
      wrapper
        .find(TimelineFilterButton)
        .at(1)
        .text()
    ).toEqual('All launches');
    expect(
      wrapper
        .find(TimelineFilterButton)
        .at(2)
        .text()
    ).toEqual('Future launches');
  });

  it('displays <FilterByYear />', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find(FilterByYear).length).toEqual(1);
  });

  it('displays <FilterByRocket />', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find(FilterByRocket).length).toEqual(1);
  });

  it('displays <FilterBySuccess />', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find(FilterBySuccess).length).toEqual(1);
  });
});
