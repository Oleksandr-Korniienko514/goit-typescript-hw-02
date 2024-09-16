import React from 'react';
import css from './Feedback.module.css';

const Feedback = ({ feedback, total, positive }) => {
    return (
        <div className={css.list}>
            <p className={css.item}>Good: {feedback.good}</p>
            <p className={css.item}>Neutral: {feedback.neutral}</p>
            <p className={css.item}>Bad: {feedback.bad}</p>
            <p className={css.item}>Total: {total}</p>
            <p className={css.item}>Positive: {positive}%</p>
        </div>
    );
};

export default Feedback;
