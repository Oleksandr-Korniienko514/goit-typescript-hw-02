import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

interface Image {
    id: number;
    webformatURL: string;
    tags: string;
}

interface ImageGalleryProps {
    images: Image[];
    onImageClick: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
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
