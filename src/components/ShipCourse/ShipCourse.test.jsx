import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShipCourse from './ShipCourse';
import shipsData from '../../../__tests__/data/ships';

Enzyme.configure({ adapter: new Adapter() });

describe('ShipCourse', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ShipCourse ship={shipsData[0]} />);
    wrapper.unmount();
  });

  it("does not render component when ship's speed is not defined", () => {
    const ship = { ...shipsData[0] };

    const wrapper = shallow(<ShipCourse ship={ship} />);
    expect(wrapper.type()).toBe(null);
  });

  it('displays an actual ship direction', () => {
    const ship = { ...shipsData[0] };
    ship.speed_kn = 10;
    ship.course_deg = 20;

    const wrapper = shallow(<ShipCourse ship={ship} />);
    expect(wrapper.find('.ship-course__direction').length).toBe(1);
    expect(
      wrapper
        .find('.ship-course__direction')
        .first()
        .prop('style')
    ).toHaveProperty('transform', 'rotate(20deg)');
  });

  it('displays an actual speed', () => {
    const ship = { ...shipsData[0] };
    ship.speed_kn = 10;
    ship.course_deg = 20;

    const wrapper = shallow(<ShipCourse ship={ship} />);
    expect(wrapper.find('.ship-course__speed').length).toBe(1);
    expect(
      wrapper
        .find('.ship-course__speed')
        .first()
        .text()
    ).toBe('10 kn');
  });
});
