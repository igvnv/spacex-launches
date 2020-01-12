import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

it('renders <AppHeader/> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AppHeader).length).toBe(1);
});

it('renders <AppFooter/> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AppFooter).length).toBe(1);
});
