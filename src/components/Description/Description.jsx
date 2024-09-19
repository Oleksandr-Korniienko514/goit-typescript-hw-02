import React from 'react';
import css from './Description.module.css';

const Description = ({ text }) => {
    return <p className={css.description}>{text}</p>;
};

export default Description;
