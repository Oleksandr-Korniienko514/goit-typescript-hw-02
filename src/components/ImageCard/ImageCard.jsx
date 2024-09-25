import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
    return (
        <div className={styles.ImageCard} onClick={onClick}>
            <img src={image.webformatURL} alt={image.tags} />
        </div>
    );
};

export default ImageCard;
