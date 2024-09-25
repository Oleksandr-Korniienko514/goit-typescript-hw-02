import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick }) => {
    return (
        <ul className={styles.ImageGallery}>
            {images.map((image, index) => (
                <li key={image.id}>
                    <ImageCard image={image} onClick={() => onImageClick(index)} />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;
