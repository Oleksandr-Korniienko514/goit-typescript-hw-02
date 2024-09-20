import React from 'react';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => (
    <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
            <li key={id} className={styles.item}>
                <p>{name}: {number}</p>
                <button className={styles.deleteButton} onClick={() => deleteContact(id)}>Delete</button>
            </li>
        ))}
    </ul>
);

export default ContactList;
