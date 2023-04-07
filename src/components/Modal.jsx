import PropTypes from 'prop-types';
import css from '../css/Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ image, closeModal }) => {
  const closeModalbyEsc = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModalbyEsc, false);

    return () => {
      document.removeEventListener('keydown', closeModalbyEsc, false);
    };
  }, []);

  return (
    <div onClick={closeModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
