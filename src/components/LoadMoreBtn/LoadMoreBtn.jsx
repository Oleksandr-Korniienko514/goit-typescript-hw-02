import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
    return (
        <button className={styles.LoadMoreBtn} onClick={onClick}>
            Load more
        </button>
    );
};

export default LoadMoreBtn;
