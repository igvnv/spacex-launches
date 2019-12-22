import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { FilterBySuccess } from './FilterBySuccess';

Enzyme.configure({ adapter: new Adapter() });

describe('FilterBySuccess', () => {
  it('renders "Yes" button', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    expect(wrapper.find('button[aria-label="yes"]').length).toEqual(1);
    expect(
      wrapper
        .find('button[aria-label="yes"]')
        .first()
        .text()
    ).toEqual('Yes');
  });

  it('renders "No" button', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    expect(wrapper.find('button[aria-label="no"]').length).toEqual(1);
    expect(
      wrapper
        .find('button[aria-label="no"]')
        .first()
        .text()
    ).toEqual('No');
  });

  it('calls setFilter method on click on No button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    await wrapper
      .find('button[aria-label="no"]')
      .first()
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([false]);
  });

  it('calls setFilter method on click on Yes button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    await wrapper
      .find('button[aria-label="yes"]')
      .first()
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([true]);
  });

  it('has no active buttons when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_active').length).toEqual(0);
  });

  it('has no clean button when nothing is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(<FilterBySuccess setFilter={setFilter} />);

    expect(wrapper.find('.filter-button_clean').length).toEqual(0);
  });

  it('has an active button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterBySuccess filterValue setFilter={setFilter} />
    );

    expect(wrapper.find('.filter-button_active').length).toEqual(1);
    expect(
      wrapper
        .find('.filter-button_active')
        .first()
        .text()
    ).toEqual('Yes');
  });

  it('has a clean button when something is selected', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterBySuccess filterValue setFilter={setFilter} />
    );

    expect(wrapper.find('.filter-button_clean').length).toEqual(1);
  });

  it('calls setFilter method with NULL value on click on clean button', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <FilterBySuccess filterValue setFilter={setFilter} />
    );

    await wrapper
      .find('.filter-button_clean')
      .first()
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([null]);
  });
});
