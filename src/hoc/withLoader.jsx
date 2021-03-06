import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../components/Loader/Loader';
import LoadingError from '../components/LoadingError/LoadingError';
import { LoadingStates } from '../redux/actions';

/**
 * HOC for `WrappedComponent` with loader function and loading status.
 *
 * Returns the component:
 * - `Loader` when `loadingState` is NULL or LOADING
 * - `LoadingError` when `loadingState` is ERROR
 * - `WrappedComponent` when `loadingState` is DONE
 *
 * Must have the props:
 * - {function} fetchMethod
 * - {string} loadingState
 *
 * @param WrappedComponent
 * @param mapStateToProps
 * @param mapDispatchToProps
 */
function withLoader(WrappedComponent, mapStateToProps, mapDispatchToProps) {
  class WithLoader extends React.Component {
    componentDidMount() {
      const { fetchMethod } = this.props;
      fetchMethod();
    }

    render() {
      const { fetchMethod, loadingState } = this.props;

      switch (loadingState) {
        case null:
        case LoadingStates.LOADING:
          return <Loader />;
        case LoadingStates.ERROR:
          return <LoadingError tryAgain={() => fetchMethod()} />;
        default:
          return <WrappedComponent {...this.props} />;
      }
    }
  }

  WithLoader.defaultProps = {
    loadingState: null,
  };
  WithLoader.propTypes = {
    fetchMethod: PropTypes.func.isRequired,
    loadingState: PropTypes.string,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithLoader);
}

export default withLoader;
