import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { RocketInfo } from './RocketInfo';
import rocketsData from '../../../__tests__/helpers/rockets';

Enzyme.configure({ adapter: new Adapter() });

describe('RocketInfo', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <RocketInfo
        rocketId={rocketsData[0].rocket_id}
        rocket={rocketsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
