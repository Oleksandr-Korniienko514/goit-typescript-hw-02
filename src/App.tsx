import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage';
import { fetchImages } from './components/Services/Api';

interface Image {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page, controller);

        if (data.hits.length === 0) {

          setImages([]);
          setError('No images found');
          toast.error("No photos found for your query!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          setImages((prevImages) => {
            if (page === 1) {
              return data.hits;
            } else {
              return [...prevImages, ...data.hits];
            }
          });
        }
        setIsLoading(false);
      } catch (error) {
        setError('Something went wrong');
        setIsLoading(false);
        toast.error("An error occurred while loading the data!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    };

    fetchGallery();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  const handleSearchSubmit = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
      setError(null);
      setHasSearched(true);
    } else {
      if (images.length === 0) {
        toast.error('No photos found for your query!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImageIndex(null);
  };

  return (
    <div className="app">
      {!hasSearched && <WelcomeMessage />}

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
          currentImageIndex={currentImageIndex!}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
