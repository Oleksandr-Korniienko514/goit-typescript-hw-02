import React from 'react';
import styles from './WelcomeMessage.module.css';

const WelcomeMessage: React.FC = () => {
    return (
        <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>Welcome!</h1>
            <p className={styles.welcomeText}>
                Here you can find any image to your taste and preference. Just enter a query and discover the best images!
            </p>
        </div>
    );
};

export default WelcomeMessage;
