import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

import CloseButton from './CloseButton';

Enzyme.configure({ adapter: new Adapter() });

describe('CloseButton', () => {
  it('contains .launch-data-short__close element', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<CloseButton onClick={onClick} />);
    expect(wrapper.find('.launch-data-short__close').length).toBe(1);
  });

  it('fires onClick event when key SPACE is down on button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<CloseButton onClick={onClick} />);

    wrapper
      .find('.launch-data-short__close')
      .simulate('keyDown', { keyCode: KEY_SPACE });
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('fires onClick event when key ENTER is down on button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<CloseButton onClick={onClick} />);

    wrapper
      .find('.launch-data-short__close')
      .simulate('keyDown', { keyCode: KEY_ENTER });
    expect(onClick.mock.calls.length).toBe(1);
  });
});
