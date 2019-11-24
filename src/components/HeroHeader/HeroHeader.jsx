import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const HeroHeader = ({ type, title, photo }) => {
  const [modalVisible, modalVisibleSet] = useState(false);

  return (
    <div
      className={
        [
          'hero-header',
          photo ? 'hero-header_with-background' : '',
          type ? `hero-header_type-${type}` : '',
        ].join(' ')
      }
      style={{ backgroundImage: photo ? `url(${photo})` : null }}
    >
      <h2 className="hero-header__title">
        {title}
      </h2>

      {photo && (
        <button
          type="button"
          className="hero-header__zoom-image"
          onClick={() => modalVisibleSet(true)}
        >
          Zoom image
        </button>
      )}

      {modalVisible && (
        <Modal onClose={() => modalVisibleSet(false)}>
          <div className="modal__image-viewer">
            <img src={photo} alt={title} />
          </div>
        </Modal>
      )}
    </div>
  );
};
HeroHeader.defaultProps = {
  type: null,
  photo: null,
};
HeroHeader.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  photo: PropTypes.string,
};

export default HeroHeader;
