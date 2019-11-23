import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DragonInfo } from './DragonInfo';
import dragonsData from '../../../__tests__/data/dragons';

Enzyme.configure({ adapter: new Adapter() });

describe('RocketInfo', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <DragonInfo
        dragonId={dragonsData[0].id}
        dragon={dragonsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
