import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MapLink from './MapLink';
import Modal from '../Modal';

Enzyme.configure({ adapter: new Adapter() });

const position = { lat: 10, lng: -10 };

describe('MapLink', () => {
  it('displays link with children text', () => {
    const wrapper = shallow(<MapLink position={position}>Link text</MapLink>);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('Link text');
    expect(wrapper.find('a').prop('href')).toBe(
      `http://www.google.com/maps/place/${position.lat},${position.lng}`
    );
  });

  it('does not display modal with map', () => {
    const wrapper = shallow(<MapLink position={position}>Link text</MapLink>);
    expect(wrapper.find(Modal).length).toBe(0);
  });

  it('displays modal with map on click on link', () => {
    const wrapper = shallow(<MapLink position={position}>Link text</MapLink>);
    const preventDefault = jest.fn();
    wrapper
      .find('a')
      .first()
      .simulate('click', { preventDefault });
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('prevents default for link click', () => {
    const wrapper = shallow(<MapLink position={position}>Link text</MapLink>);
    const preventDefault = jest.fn();
    wrapper
      .find('a')
      .first()
      .simulate('click', { preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
  });
});
