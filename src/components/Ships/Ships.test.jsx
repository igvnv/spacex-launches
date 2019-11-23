import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Ships } from './Ships';
import ShipInfoShort from '../ShipInfoShort';
import shipsData from '../../../__tests__/data/ships';

Enzyme.configure({ adapter: new Adapter() });

describe('Ships', () => {
  it('displays short info about all ships', () => {
    const wrapper = shallow(<Ships ships={shipsData} />);
    expect(wrapper.find(ShipInfoShort).length).toEqual(shipsData.length);
  });
});
