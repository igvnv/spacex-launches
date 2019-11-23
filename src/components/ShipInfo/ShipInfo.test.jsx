import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ShipInfo } from './ShipInfo';
import shipsData from '../../../__tests__/data/ships';

Enzyme.configure({ adapter: new Adapter() });

describe('ShipInfo', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <ShipInfo
        shipId={shipsData[0].ship_id}
        ship={shipsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
