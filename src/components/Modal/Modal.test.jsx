import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    goBack: mockGoBack,
  }),
}));

Enzyme.configure({ adapter: new Adapter() });

const ChildrenComponent = () => <p>Children</p>;

describe('Modal', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('contains children component', () => {
    const wrapper = shallow((
      <Modal>
        <ChildrenComponent />
      </Modal>
    ));
    expect(wrapper.find(ChildrenComponent).length).toBe(1);
  });

  it('has close button', () => {
    const wrapper = shallow((
      <Modal>
        <ChildrenComponent />
      </Modal>
    ));
    expect(wrapper.find('.modal__close-button').length).toBe(1);
  });

  it('calls history.goBack on close button click', () => {
    const wrapper = shallow((
      <Modal>
        <ChildrenComponent />
      </Modal>
    ));
    wrapper.find('.modal__close-button').first().simulate('click', { stopPropagation: jest.fn() });
    expect(mockGoBack.mock.calls.length).toBe(1);
  });

  it('displays modal background', () => {
    const wrapper = shallow((
      <Modal>
        <ChildrenComponent />
      </Modal>
    ));
    expect(wrapper.find('.modal-background').length).toBe(1);
  });
});
