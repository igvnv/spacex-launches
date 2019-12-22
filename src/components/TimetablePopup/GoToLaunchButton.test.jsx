import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

import GoToLaunchButton from './GoToLaunchButton';

Enzyme.configure({ adapter: new Adapter() });

describe('GoToLaunchButton', () => {
  it('contains .launch-data-short__show-full element', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<GoToLaunchButton onClick={onClick} />);
    expect(wrapper.find('.launch-data-short__show-full').length).toBe(1);
  });

  it('fires onClick event when key SPACE is down on button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<GoToLaunchButton onClick={onClick} />);

    wrapper
      .find('.launch-data-short__show-full')
      .simulate('keyDown', { keyCode: KEY_SPACE });
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('fires onClick event when key ENTER is down on button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<GoToLaunchButton onClick={onClick} />);

    wrapper
      .find('.launch-data-short__show-full')
      .simulate('keyDown', { keyCode: KEY_ENTER });
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('adds .launch-data-short__show-full_%direction% class name', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <GoToLaunchButton direction="left" onClick={onClick} />
    );
    expect(wrapper.find('.launch-data-short__show-full_left').length).toBe(1);
  });
});
