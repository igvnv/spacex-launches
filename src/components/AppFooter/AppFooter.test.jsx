import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AppFooter from './AppFooter';

Enzyme.configure({ adapter: new Adapter() });

describe('AppFooter', () => {
  it('renders without crashing', () => {
    const wrapper = shallow((
      <AppFooter />
    ));
    wrapper.unmount();
  });
});
