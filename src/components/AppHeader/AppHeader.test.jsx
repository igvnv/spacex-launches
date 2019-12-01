import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AppHeader from './AppHeader';
import MainMenu from '../MainMenu';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow((<AppHeader />));
  wrapper.unmount();
});

it('renders <MainMenu/> component', () => {
  const wrapper = shallow((<AppHeader />));
  expect(wrapper.find(MainMenu).length).toBe(1);
});
