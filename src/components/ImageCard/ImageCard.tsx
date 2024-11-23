import styles from './ImageCard.module.css';

interface Image {
    webformatURL: string;
    tags: string;
}

interface ImageCardProps {
    image: Image;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
    return (
        <div className={styles.ImageCard} onClick={onClick}>
            <img src={image.webformatURL} alt={image.tags} />
        </div>
    );
};

export default ImageCard;
