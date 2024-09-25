import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './components/Services/Api';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page, controller);
        if (data.hits.length === 0) {
          setError('No images found');
          return;
        }
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setIsLoading(false);
      } catch (error) {
        setError('Something went wrong');
        setIsLoading(false);
      }
    };

    fetchGallery();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImageIndex(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          images={images}
          currentImageIndex={currentImageIndex}
        />
      )}
    </div>
  );
};

export default App;
