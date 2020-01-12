import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import withLoader from './withLoader';
import Loader from '../components/Loader/Loader';
import LoadingError from '../components/LoadingError/LoadingError';
import { LoadingStates } from '../store/actions';

Enzyme.configure({ adapter: new Adapter() });

const WrappedComponent = () => <div>Wrapped component</div>;
const fetchMethod = jest.fn();
const mapDispatchToProps = (dispatch) => ({
  fetchMethod: () => dispatch(fetchMethod),
});

let store;

describe('HOC withLoader', () => {
  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore({});
    fetchMethod.mockRestore();
  });

  it('renders <Loader/> when mounted', () => {
    const mapStateToProps = () => ({ loadingState: null });
    const HocComponent = withLoader(
      WrappedComponent,
      mapStateToProps,
      mapDispatchToProps
    );

    /** @type ShallowWrapper */
    const wrapper = mount(<HocComponent store={store} />);

    expect(wrapper.find(Loader).length).toBe(1);
    expect(wrapper.find(LoadingError).length).toBe(0);
    expect(wrapper.find(WrappedComponent).length).toBe(0);
  });

  it('renders <Loader/> when loadingState is LOADING', () => {
    const mapStateToProps = () => ({ loadingState: LoadingStates.LOADING });
    const HocComponent = withLoader(
      WrappedComponent,
      mapStateToProps,
      mapDispatchToProps
    );

    /** @type ShallowWrapper */
    const wrapper = mount(<HocComponent store={store} />);

    expect(wrapper.find(Loader).length).toBe(1);
    expect(wrapper.find(LoadingError).length).toBe(0);
    expect(wrapper.find(WrappedComponent).length).toBe(0);
  });

  it('calls `fetchMethod` when mounted', () => {
    const mapStateToProps = () => ({ loadingState: null });
    const HocComponent = withLoader(
      WrappedComponent,
      mapStateToProps,
      mapDispatchToProps
    );

    mount(<HocComponent store={store} />);
    expect(fetchMethod.mock.calls.length).toBe(1);
  });

  it('renders <LoadingError/> when loadingState is ERROR', () => {
    const mapStateToProps = () => ({ loadingState: LoadingStates.ERROR });
    const HocComponent = withLoader(
      WrappedComponent,
      mapStateToProps,
      mapDispatchToProps
    );

    /** @type ShallowWrapper */
    const wrapper = mount(<HocComponent store={store} />);

    expect(wrapper.find(Loader).length).toBe(0);
    expect(wrapper.find(LoadingError).length).toBe(1);
    expect(wrapper.find(WrappedComponent).length).toBe(0);
  });

  it('renders <WrappedComponent/> when loadingState is DONE', () => {
    const mapStateToProps = () => ({ loadingState: LoadingStates.DONE });
    const HocComponent = withLoader(
      WrappedComponent,
      mapStateToProps,
      mapDispatchToProps
    );

    /** @type ShallowWrapper */
    const wrapper = mount(<HocComponent store={store} />);

    expect(wrapper.find(Loader).length).toBe(0);
    expect(wrapper.find(LoadingError).length).toBe(0);
    expect(wrapper.find(WrappedComponent).length).toBe(1);
  });
});
