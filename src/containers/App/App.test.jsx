import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import MainMenu from '../../components/MainMenu/MainMenu';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

it('renders <MainMenu/> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(MainMenu).length).toBe(1);
});
