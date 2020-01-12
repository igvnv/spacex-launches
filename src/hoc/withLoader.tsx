import React, { ElementType } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Loader from '../components/Loader/Loader';
import LoadingError from '../components/LoadingError/LoadingError';
import { LoadingStates } from '../store/actions';
import { AppState, AppActions } from '../store/reducers';
import loadingStates from '../store/types';

export interface WithLoaderStateProps {
  loadingState: loadingStates | null;
  [key: string]: any;
}

export interface WithLoaderDispatchProps {
  fetchMethod: () => void;
}

interface OwnProps {}

type Props = WithLoaderStateProps & WithLoaderDispatchProps & OwnProps;

interface WithLoaderState {}

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
function withLoader(
  WrappedComponent: ElementType,
  mapStateToProps: (state: any, ownProps: any) => WithLoaderStateProps,
  // mapStateToProps: (state: AppState, ownProps: any) => WithLoaderStateProps,
  mapDispatchToProps: (
    dispatch: ThunkDispatch<AppState, null, AppActions>,
    ownProps: any
  ) => WithLoaderDispatchProps
) {
  class WithLoader extends React.Component<Props, WithLoaderState> {
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

  return connect<WithLoaderStateProps, WithLoaderDispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(WithLoader);
}

export default withLoader;
