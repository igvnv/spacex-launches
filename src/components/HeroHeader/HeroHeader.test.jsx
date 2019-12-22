import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeroHeader from './HeroHeader';
import Modal from '../Modal';

Enzyme.configure({ adapter: new Adapter() });

describe('HeroHeader', () => {
  it('displays title', () => {
    const wrapper = shallow(<HeroHeader title="Title" />);
    expect(wrapper.find('.hero-header__title').text()).toEqual('Title');
  });

  it('has .hero-header class name', () => {
    const wrapper = shallow(<HeroHeader title="Title" />);
    expect(wrapper.find('.hero-header').length).toEqual(1);
  });

  it('does not set background image when photo is empty', () => {
    const wrapper = shallow(<HeroHeader title="Title" />);
    expect(
      wrapper.find('.hero-header').hasClass('hero-header_with-background')
    ).toBe(false);
    expect(
      wrapper
        .find('.hero-header')
        .first()
        .prop('style')
    ).not.toHaveProperty('background-image');
  });

  it('sets background image when photo is not empty', () => {
    const wrapper = shallow(<HeroHeader title="Title" photo="photo.jpg" />);
    expect(
      wrapper.find('.hero-header').hasClass('hero-header_with-background')
    ).toBe(true);
    expect(
      wrapper
        .find('.hero-header')
        .first()
        .prop('style')
    ).toHaveProperty('backgroundImage', 'url(photo.jpg)');
  });

  it('adds type class name', () => {
    const wrapper = shallow(<HeroHeader title="Title" type="test" />);
    expect(wrapper.find('.hero-header_type-test').length).toBe(1);
  });

  it('does not display zoom button when photo is empty', () => {
    const wrapper = shallow(<HeroHeader title="Title" />);
    expect(wrapper.find('.hero-header__zoom-image').length).toBe(0);
  });

  it('displays zoom button when photo is not empty', () => {
    const wrapper = shallow(<HeroHeader title="Title" photo="photo.jpg" />);
    expect(wrapper.find('.hero-header__zoom-image').length).toBe(1);
  });

  it('does not display modal with full photo', () => {
    const wrapper = shallow(<HeroHeader title="Title" photo="photo.jpg" />);
    expect(wrapper.find(Modal).length).toBe(0);
  });

  it('displays modal with full photo when zoom button is clicked', () => {
    const wrapper = shallow(<HeroHeader title="Title" photo="photo.jpg" />);
    wrapper.find('.hero-header__zoom-image').simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('hides modal correctly', () => {
    const wrapper = mount(<HeroHeader title="Title" photo="photo.jpg" />);
    wrapper.find('.hero-header__zoom-image').simulate('click');
    wrapper.find('.modal__close-button').simulate('click');
    expect(wrapper.find(Modal).length).toBe(0);
  });
});
