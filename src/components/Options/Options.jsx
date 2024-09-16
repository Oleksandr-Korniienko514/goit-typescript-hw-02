import React from 'react';
import css from './Options.module.css';

const Options = ({ onLeaveFeedback, onReset, total }) => {
    return (
        <div className={css.list}>
            <button className={css.choose} onClick={() => onLeaveFeedback('good')}>Good</button>
            <button className={css.choose} onClick={() => onLeaveFeedback('neutral')}>Neutral</button>
            <button className={css.choose} onClick={() => onLeaveFeedback('bad')}>Bad</button>
            {total > 0 && <button className={css.choose} onClick={onReset}>Reset</button>}
        </div>
    );
};

export default Options;
