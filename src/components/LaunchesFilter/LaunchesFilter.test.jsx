import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LaunchesFilter from './LaunchesFilter';
import TimelineFilterButton from './TimelineFilterButton/TimelineFilterButton';

Enzyme.configure({ adapter: new Adapter() });

describe('TimelineFilterButton', () => {
  it('contains three timeline buttons (past, all, future)', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find(TimelineFilterButton).length).toEqual(3);
    expect(wrapper.find(TimelineFilterButton).at(0).text()).toEqual('Past launches');
    expect(wrapper.find(TimelineFilterButton).at(1).text()).toEqual('All launches');
    expect(wrapper.find(TimelineFilterButton).at(2).text()).toEqual('Future launches');
  });

  it('contains additional filters', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find('.additional-filters').exists()).toBeTruthy();
  });

  it('has hide button for additional filters', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find('.additional-filters__button-hide').exists()).toBeTruthy();
  });

  it('hides additional filters on hide button click', async () => {
    const wrapper = shallow(<LaunchesFilter />);
    await wrapper.find('.additional-filters__button-hide').simulate('click');
    expect(wrapper.find('.additional-filters').exists()).toBeFalsy();
  });

  it('has no button for show additional filters by default', () => {
    const wrapper = shallow(<LaunchesFilter />);
    expect(wrapper.find('.launches-filter__show-additional-filters').exists()).toBeFalsy();
  });

  it('has button for show additional filters when filters are hid', async () => {
    const wrapper = shallow(<LaunchesFilter />);
    await wrapper.find('.additional-filters__button-hide').simulate('click');
    expect(wrapper.find('.launches-filter__show-additional-filters').exists()).toBeTruthy();
  });
});
