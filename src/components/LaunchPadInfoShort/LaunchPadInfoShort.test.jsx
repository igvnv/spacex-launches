import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LaunchPadInfoShort } from './LaunchPadInfoShort';
import launchPadsData from '../../../__tests__/helpers/launchpads';

Enzyme.configure({ adapter: new Adapter() });

describe('LaunchPadInfoShort', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <LaunchPadInfoShort
        launchPadId={launchPadsData[0].id}
        launchPad={launchPadsData[0]}
      />
    ));
    wrapper.unmount();
  });
});
