import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
    const initialValues = { name: '', number: '' };

    // Схема валидации
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Мінімальна кількість символів - 3')
            .max(50, 'Максимальна кількість символів - 50')
            .required('Обовязково для заповнення'),
        number: Yup.string()
            .min(6, 'Мінімальна кількість символів - 6')
            .required('Обовязково для заповнення'),
    });


    const handleSubmit = (values, { resetForm }) => {
        addContact(values);
        resetForm(); // 
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <label className={styles.label}>
                        Name:
                        <Field name="name" type="text" className={styles.input} />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </label>
                    <label className={styles.label}>
                        Number:
                        <Field name="number" type="tel" className={styles.input} />
                        <ErrorMessage name="number" component="div" className={styles.error} />
                    </label>
                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        Add contact
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
