import React from 'react';
import { useParams } from 'react-router-dom';

import DragonInfo from '../../components/DragonInfo';
import { fetchDragonsIfNeeded } from '../../store/actions/dragons';
import withLoader from '../../hoc/withLoader';

export const DragonInfoContainer = () => {
  const { dragonId } = useParams();
  return <DragonInfo dragonId={dragonId} />;
};

const mapStateToProps = (state) => ({
  loadingState: state.dragons.state,
  dragons: state.dragons.data,
});

export default withLoader(DragonInfoContainer, mapStateToProps, {
  fetchMethod: fetchDragonsIfNeeded,
});
