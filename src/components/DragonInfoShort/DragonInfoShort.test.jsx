import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DragonInfoShort } from './DragonInfoShort';
import dragonsData from '../../../__tests__/data/dragons';

Enzyme.configure({ adapter: new Adapter() });

describe('DragonInfoShort', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <DragonInfoShort
        dragonId={dragonsData[0].id}
        dragon={dragonsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
