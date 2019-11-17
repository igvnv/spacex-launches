import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimetableYear from './TimetableYear';
import launchesList, { unsuccessfulLaunch, upcomingLaunch } from '../../../__tests__/helpers/launches';

Enzyme.configure({ adapter: new Adapter() });

const createWrapper = ({ year = 2000, displayLaunch = jest.fn(), launches = [] } = {}) => {
  const wrapper = shallow((
    <TimetableYear
      year={year}
      displayLaunch={displayLaunch}
      launches={launches}
    />
  ));

  return {
    wrapper,
    displayLaunch,
    launches,
  };
};

describe('TimetableYear', () => {
  it('displays year label', () => {
    const { wrapper } = createWrapper({ year: 2010 });
    expect(wrapper.find('.timetable-year__label').first().text()).toBe('2010');
  });

  it('adds .timetable-year_odd for odd years', () => {
    const { wrapper } = createWrapper({ year: 2011 });
    expect(wrapper.find('.timetable-year_odd').length).toBe(1);
  });

  it('does not add .timetable-year_odd for even years', () => {
    const { wrapper } = createWrapper({ year: 2012 });
    expect(wrapper.find('.timetable-year_odd').length).toBe(0);
  });

  it('contains 12 months', () => {
    const { wrapper } = createWrapper();
    expect(wrapper.find('.timetable__month').length).toBe(12);
  });

  it('selects current month for current year', () => {
    const now = new Date();
    const { wrapper } = createWrapper({ year: now.getFullYear() });
    expect(wrapper.find('.timetable__month').at(now.getMonth()).hasClass('timetable__month_current')).toEqual(true);
  });

  it('displays launches', () => {
    const { wrapper } = createWrapper({ year: 2006, launches: launchesList });
    expect(wrapper.find('.timetable__event').length).toBe(1);
  });

  it('adds .timetable__event_unsuccesfully for unseccessfully launches', () => {
    const { wrapper } = createWrapper({
      year: +unsuccessfulLaunch.launch_year,
      launches: [unsuccessfulLaunch],
    });
    expect(wrapper.find('.timetable__event_unsuccesfully').length).toBe(1);
  });

  it('adds .timetable__event_upcoming for unseccessfully launches', () => {
    const { wrapper } = createWrapper({
      year: +upcomingLaunch.launch_year,
      launches: [upcomingLaunch],
    });
    expect(wrapper.find('.timetable__event_upcoming').length).toBe(1);
  });

  it('fires displayLaunch when launch button is clicked', () => {
    const target = {};
    const mockedEvent = { target };
    const { wrapper, displayLaunch } = createWrapper({ year: 2006, launches: launchesList });
    wrapper.find('.timetable__event').first().simulate('click', mockedEvent);
    expect(displayLaunch.mock.calls.length).toBe(1);
    expect(displayLaunch.mock.calls[0]).toEqual([launchesList[0], target]);
  });
});
