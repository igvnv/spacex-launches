import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { FilterByRocket } from './FilterByRocket';

Enzyme.configure({ adapter: new Adapter() });

const launches = [
  { rocket: { rocket_id: 'first_rocket', rocket_name: 'First Rocket' } },
  { rocket: { rocket_id: 'second_rocket', rocket_name: 'Second Rocket' } },
  { rocket: { rocket_id: 'first_rocket', rocket_name: 'First Rocket' } },
  { rocket: { rocket_id: 'third_rocket', rocket_name: 'Third Rocket' } },
];

describe('FilterByRocket', () => {
  it('renders all uniq rockets from launches', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket launches={launches} setFilter={setFilter} />
    );

    expect(wrapper.find('button').length).toEqual(3);
    expect(
      wrapper
        .find('button')
        .at(0)
        .text()
    ).toEqual('First Rocket');
    expect(
      wrapper
        .find('button')
        .at(1)
        .text()
    ).toEqual('Second Rocket');
    expect(
      wrapper
        .find('button')
        .at(2)
        .text()
    ).toEqual('Third Rocket');
  });

  it('calls setFilter method on click on button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket launches={launches} setFilter={setFilter} />
    );

    await wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual(['first_rocket']);
  });

  it('has no active buttons when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket launches={launches} setFilter={setFilter} />
    );

    expect(wrapper.find('.filter-button_active').length).toEqual(0);
  });

  it('has no clean button when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket launches={launches} setFilter={setFilter} />
    );

    expect(wrapper.find('.filter-button_clean').length).toEqual(0);
  });

  it('has an active button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket
        filterValue="second_rocket"
        launches={launches}
        setFilter={setFilter}
      />
    );

    expect(wrapper.find('.filter-button_active').length).toEqual(1);
    expect(
      wrapper
        .find('.filter-button_active')
        .first()
        .text()
    ).toEqual('Second Rocket');
  });

  it('has a clean button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket
        filterValue="second_rocket"
        launches={launches}
        setFilter={setFilter}
      />
    );

    expect(wrapper.find('.filter-button_clean').length).toEqual(1);
  });

  it('calls setFilter method with NULL value on click on clean button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterByRocket
        filterValue="second_rocket"
        launches={launches}
        setFilter={setFilter}
      />
    );

    await wrapper
      .find('.filter-button_clean')
      .first()
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([null]);
  });
});
