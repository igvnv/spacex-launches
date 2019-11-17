import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimetablePopup from './TimetablePopup';
import CloseButton from './CloseButton';

Enzyme.configure({ adapter: new Adapter() });

const ChildrenComponent = () => <p>Children</p>;

const createWrapper = (goToLaunch = jest.fn()) => {
  const wrapper = shallow((
    <TimetablePopup goToLaunch={goToLaunch}>
      <ChildrenComponent />
    </TimetablePopup>
  ));

  return {
    wrapper,
    goToLaunch,
  };
};

describe('TimetablePopup', () => {
  it('displays child component', () => {
    const { wrapper } = createWrapper();
    expect(wrapper.find(ChildrenComponent).length).toBe(1);
  });

  it('displays close button', () => {
    const { wrapper } = createWrapper();
    expect(wrapper.find(CloseButton).length).toBe(1);
  });
});
