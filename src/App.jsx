import { useState, useEffect } from 'react';
import { fetchPhotos } from './services/api';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMore from './components/LoadMore/LoadMore';
import { ImageModal } from './components/ImageModal/ImageModal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages(null);
  };

  useEffect(() => {
    if (!searchQuery.trim()) return;

    async function loadPhotos() {
      try {
        setLoader(true);
        const response = await fetchPhotos(searchQuery, page);
        setImages(prevImages => {
          if (prevImages === null) {
            return response;
          }
          return [...prevImages, ...response];
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    }

    loadPhotos();
  }, [searchQuery, page]);

  const loadMorePhotos = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearchSubmit} />
      {images !== null && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {error && <ErrorMessage error={error.message} />}
      {loader && (
        <div className="loaderWrapper">
          <Loader />
        </div>
      )}
      {images !== null && !loader && <LoadMore onClick={loadMorePhotos} />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}

export default App;
