import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { FilterByYear } from './FilterByYear';

Enzyme.configure({ adapter: new Adapter() });

const launches = [
  { launch_year: '2010' },
  { launch_year: '2010' },
  { launch_year: '2011' },
  { launch_year: '2012' },
];

describe('FilterByYear', () => {
  it('renders all uniq years from launches', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear launches={launches} setFilter={setFilter} />);

    expect(wrapper.find('button').length).toEqual(3);
    expect(wrapper.find('button').at(0).text()).toEqual('2010');
    expect(wrapper.find('button').at(1).text()).toEqual('2011');
    expect(wrapper.find('button').at(2).text()).toEqual('2012');
  });

  it('calls setFilter method on click on button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear launches={launches} setFilter={setFilter} />);

    await wrapper.find('button').at(0).simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual(['2010']);
  });

  it('has no active buttons when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear launches={launches} setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_active').length).toEqual(0);
  });

  it('has no clean button when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear launches={launches} setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_clean').length).toEqual(0);
  });

  it('has an active button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear filterValue="2011" launches={launches} setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_active').length).toEqual(1);
    expect(wrapper.find('.filter-button_active').first().text()).toEqual('2011');
  });

  it('has a clean button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear filterValue="second_rocket" launches={launches} setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_clean').length).toEqual(1);
  });

  it('calls setFilter method with NULL value on click on clean button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterByYear filterValue="2011" launches={launches} setFilter={setFilter} />);

    wrapper.find('.filter-button_clean').first().simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([null]);
  });

  it('cleans filter by year when year is not in available list', () => {
    const setFilter = jest.fn();
    shallow(<FilterByYear filterValue="2000" launches={launches} setFilter={setFilter} />);
    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([null]);
  });
});
