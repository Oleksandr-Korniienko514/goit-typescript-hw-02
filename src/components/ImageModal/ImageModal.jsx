import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import toast from "react-hot-toast";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, images, currentImageIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!images || images.length === 0 || !images[currentIndex]) {
        toast.error("Image not available.");
        return null;
    }

    const { largeImageURL, tags } = images[currentIndex];

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
            onClick={handleOverlayClick}
        >
            <div className={styles.imageModal}>
                <img className={styles.img} src={largeImageURL} alt={tags} />
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>

                <button className={styles.prevButton} onClick={handlePrevImage}>
                    <FaArrowLeft />
                </button>
                <button className={styles.nextButton} onClick={handleNextImage}>
                    <FaArrowRight />
                </button>
            </div>
        </ReactModal>
    );
};

export default ImageModal;
