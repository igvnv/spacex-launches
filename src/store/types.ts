export const LOADING_IN_PROCESS = 'LOADING';
export const LOADING_ERROR = 'ERROR';
export const LOADING_IS_DONE = 'DONE';

type loadingStates =
  | typeof LOADING_IN_PROCESS
  | typeof LOADING_ERROR
  | typeof LOADING_IS_DONE;

export default loadingStates;
