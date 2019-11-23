import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ShipInfoShort } from './ShipInfoShort';
import shipsData from '../../../__tests__/helpers/ships';

Enzyme.configure({ adapter: new Adapter() });

describe('ShipInfoShort', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <ShipInfoShort
        shipId={shipsData[0].ship_id}
        ship={shipsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
