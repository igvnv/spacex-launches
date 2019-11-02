import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchesTimeline } from '../../../redux/actions';
import { TimelineFilterButton } from './TimelineFilterButton';

Enzyme.configure({ adapter: new Adapter() });

describe('TimelineFilterButton', () => {
  it('displays children as button\'s value', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.ALL}
      >
        Button value
      </TimelineFilterButton>,
    );

    expect(wrapper.find('button').first().text()).toEqual('Button value');
  });

  it('has no active class when timeline is displayed', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.ALL}
      >
        Button value
      </TimelineFilterButton>,
    );

    expect(wrapper.find('button').first().hasClass('button-group__button_active')).toEqual(false);
  });

  it('has active class when timeline is displayed', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.FUTURE}
      >
        Button value
      </TimelineFilterButton>,
    );

    expect(wrapper.find('button').first().hasClass('button-group__button_active')).toEqual(true);
  });

  it('calls setFilter on click', async () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.ALL}
      >
        Button value
      </TimelineFilterButton>,
    );

    await wrapper.find('button').first().simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([LaunchesTimeline.FUTURE]);
  });
});
