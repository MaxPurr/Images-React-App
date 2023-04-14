import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { Button } from './Button';
import { Context } from './Context';
import css from '../css/App.module.css';
import api from '../services/api';

export const App = () => {
  const [images, SetImages] = useState([]);
  const [showModal, SetShowModal] = useState(false);
  const [modalImage, SetModalImage] = useState('');
  const [page, SetPage] = useState(1);
  const [searchQuery, SetSearchQuery] = useState('');
  const [totalHits, SetTotalHits] = useState(0);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(null);

  const openModal = evt => {
    const id = Number.parseInt(evt.currentTarget.getAttribute('for'));
    let modalImage;
    for (const image of images) {
      if (image.id === id) {
        modalImage = image.largeImageURL;
      }
    }
    SetModalImage(modalImage);
    SetShowModal(true);
  };

  const closeModal = () => {
    SetShowModal(false);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;
    if (searchQuery) {
      SetSearchQuery(searchQuery);
      SetIsLoading(true);
      SetImages([]);
      SetTotalHits(0);
      SetPage(1);
    }
  };

  const loadMore = () => {
    SetPage(page + 1);
    SetIsLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      return await api.request(searchQuery, page);
    };
    if (searchQuery !== '') {
      fetchData()
        .then(response => {
          const { totalHits, hits } = response;
          if (totalHits === 0) {
            SetError(
              new Error(
                'There are no images matching your search query. Please try again.'
              )
            );
          } else {
            const newImages = hits.map(hit => {
              return {
                webformatURL: hit.webformatURL,
                largeImageURL: hit.largeImageURL,
                tags: hit.tags,
                id: hit.id,
              };
            });
            SetImages(images.concat(newImages));
            SetTotalHits(totalHits);
            SetError(null);
          }
        })
        .catch(error => SetError(error))
        .finally(SetIsLoading(false));
    }
  }, [searchQuery, page]);

  return (
    <Context.Provider value={{ openModal }}>
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {images.length !== 0 && <ImageGallery images={images} />}
        {totalHits >= page * 12 && <Button loadMore={loadMore} />}
        {isLoading && <Loader />}
        {showModal && <Modal image={modalImage} closeModal={closeModal} />}
      </div>
    </Context.Provider>
  );
};
