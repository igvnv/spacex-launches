import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Rockets } from './Rockets';
import RocketInfoShort from '../RocketInfoShort';
import rocketsData from '../../../__tests__/data/rockets';

Enzyme.configure({ adapter: new Adapter() });

describe('Rockets', () => {
  it('displays short info about all rockets', () => {
    const wrapper = shallow(<Rockets rockets={rocketsData} />);
    expect(wrapper.find(RocketInfoShort).length).toEqual(rocketsData.length);
  });
});
