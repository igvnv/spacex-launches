import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchesTimeline } from '../../../redux/actions';
import { TimelineFilterButton } from './TimelineFilterButton';

Enzyme.configure({ adapter: new Adapter() });

describe('TimelineFilterButton', () => {
  it("displays children as button's value", () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.ALL}
      >
        Button value
      </TimelineFilterButton>
    );

    expect(
      wrapper
        .find('.secondary-menu__link')
        .first()
        .text()
    ).toEqual('Button value');
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
      </TimelineFilterButton>
    );

    expect(
      wrapper
        .find('.secondary-menu__link')
        .first()
        .hasClass('secondary-menu__link_active')
    ).toEqual(false);
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
      </TimelineFilterButton>
    );

    expect(
      wrapper
        .find('.secondary-menu__link')
        .first()
        .hasClass('secondary-menu__link_active')
    ).toEqual(true);
  });

  it('calls setFilter on click', () => {
    const setFilter = jest.fn();
    const wrapper = shallow(
      <TimelineFilterButton
        setFilter={setFilter}
        timeline={LaunchesTimeline.FUTURE}
        displayedTimeline={LaunchesTimeline.ALL}
      >
        Button value
      </TimelineFilterButton>
    );

    wrapper
      .find('.secondary-menu__link')
      .first()
      .simulate('click');

    expect(setFilter.mock.calls.length).toEqual(1);
    expect(setFilter.mock.calls[0]).toEqual([LaunchesTimeline.FUTURE]);
  });
});
