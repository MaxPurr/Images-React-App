import PropTypes from 'prop-types';
import css from '../css/ImageGalleryItem.module.css';
import { useUser } from './Context';

export const ImageGalleryItem = ({ image }) => {
  const { openModal } = useUser();
  return (
    <li htmlFor={image.id} className={css.ImageGalleryItem} onClick={openModal}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.ImageGalleryItem_image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.exact({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
