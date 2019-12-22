import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal';

Enzyme.configure({ adapter: new Adapter() });

const ChildrenComponent = () => <p>Children</p>;

describe('Modal', () => {
  it('contains children component', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal onClose={onClose}>
        <ChildrenComponent />
      </Modal>
    );
    expect(wrapper.find(ChildrenComponent).length).toBe(1);
  });

  it('has close button', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal onClose={onClose}>
        <ChildrenComponent />
      </Modal>
    );
    expect(wrapper.find('.modal__close-button').length).toBe(1);
  });

  it('calls onClose on close button click', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal onClose={onClose}>
        <ChildrenComponent />
      </Modal>
    );
    wrapper
      .find('.modal__close-button')
      .first()
      .simulate('click', { stopPropagation: jest.fn() });
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('displays modal background', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal onClose={onClose}>
        <ChildrenComponent />
      </Modal>
    );
    expect(wrapper.find('.modal-background').length).toBe(1);
  });
});
