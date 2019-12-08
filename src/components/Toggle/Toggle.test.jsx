import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

import Toggle from './Toggle';

Enzyme.configure({ adapter: new Adapter() });

describe('Toggle', () => {
  it('contains .toggle element', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle onToggle={onToggle} />);

    expect(wrapper.find('.toggle').length).toBe(1);
  });

  it('does not contain label by default', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle onToggle={onToggle} />);

    expect(wrapper.find('.toggle__label').length).toBe(0);
  });

  it('has FALSE as default value', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle onToggle={onToggle} />);

    expect(wrapper.find('.toggle__shifter-point_on').length).toBe(0);
  });

  it('displays label when it passed', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle label="Label text" onToggle={onToggle} />);

    expect(wrapper.find('.toggle__label').length).toBe(1);
    expect(wrapper.find('.toggle__label').text()).toBe('Label text');
  });

  it('has .toggle__shifter-point_on when value is TRUE', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle value onToggle={onToggle} />);

    expect(wrapper.find('.toggle__shifter-point_on').length).toBe(1);
  });

  it('has no .toggle__shifter-point_on when value is FALSE', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle value={false} onToggle={onToggle} />);

    expect(wrapper.find('.toggle__shifter-point_on').length).toBe(0);
  });

  it('fires onToggle event when element is clicked', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle value={false} onToggle={onToggle} />);

    wrapper.simulate('click');
    expect(onToggle.mock.calls.length).toBe(1);
    expect(onToggle.mock.calls[0]).toEqual([true]);
  });

  it('fires onToggle event when key ENTER is down on the element', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle value={false} onToggle={onToggle} />);

    wrapper.simulate('keyDown', { keyCode: KEY_ENTER });
    expect(onToggle.mock.calls.length).toBe(1);
    expect(onToggle.mock.calls[0]).toEqual([true]);
  });

  it('fires onToggle event when key SPACE is down on the element', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle value={false} onToggle={onToggle} />);

    wrapper.simulate('keyDown', { keyCode: KEY_SPACE });
    expect(onToggle.mock.calls.length).toBe(1);
    expect(onToggle.mock.calls[0]).toEqual([true]);
  });
});
