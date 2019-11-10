import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from 'react-router-dom';

import CatalogNavigation from './CatalogNavigation';

Enzyme.configure({ adapter: new Adapter() });

const categories = [
  {
    path: 'rockets',
    name: 'Rockets',
  },
  {
    path: 'dragons',
    name: 'Dragons',
  },
];

describe('CatalogNavigation', () => {
  it('Displays all categories', () => {
    const wrapper = shallow(<CatalogNavigation categories={categories} />);
    const links = wrapper.find(NavLink);
    expect(links.at(0).prop('to')).toEqual('/catalog/rockets');
    expect(links.at(1).prop('to')).toEqual('/catalog/dragons');
  });
});
