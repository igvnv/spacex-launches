import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchPadInfo } from './LaunchPadInfo';
import launchPadsData from '../../../__tests__/data/launchpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LaunchPadInfo', () => {
  it('renders without crashing', () => {
    // Why `id.toString()`? The API is so inconsistent and has string ids
    // everywhere except for launch pads. It is easier to  use it as a string
    // (routes contain string parameters).
    const wrapper = shallow(
      <LaunchPadInfo
        launchPadId={launchPadsData[0].id.toString()}
        launchPad={launchPadsData[0]}
      />
    );
    wrapper.unmount();
  });
});
