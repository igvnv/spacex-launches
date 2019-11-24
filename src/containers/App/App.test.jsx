import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import MainMenu from '../../components/MainMenu/MainMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const wrapper = shallow((<App />));
  wrapper.unmount();
});

it('renders <MainMenu/> component', () => {
  const wrapper = shallow((<App />));
  expect(wrapper.find(MainMenu).length).toBe(1);
});
