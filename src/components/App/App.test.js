import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import AboutSpaceX from '../AboutSpaceX/AboutSpaceX';

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

it('renders AboutSpaceX component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AboutSpaceX).length).toBe(1);
});