import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const OrchidSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    origin: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    image: Yup.string()
        .test('is-img-path-or-url', 'Invalid image path or URL', value => {
            if (!value) return false;
            // Accept if starts with / (local) or is a valid URL
            return value.startsWith('/') || /^(https?:)?\/\//.test(value);
        })
        .required('Required'),
    videoUrl: Yup.string()
        .test('is-video-path-or-url', 'Invalid video path or URL', value => {
            if (!value) return true; // allow empty
            return value.startsWith('/') || /^(https?:)?\/\//.test(value);
        })
        .nullable(),
    color: Yup.string().nullable(),
    rating: Yup.number().min(0).max(5).nullable(),
    numberOfLike: Yup.number().min(0).nullable(),
    detail: Yup.string().nullable(),
});

export default function OrchidForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
    const user = useSelector(state => state.user.user);
    const defaults = {
        name: '',
        origin: '',
        category: '',
        image: '',
        videoUrl: '',
        color: '',
        rating: 0,
        isSpecial: false,
        isNatural: false,
        numberOfLike: 0,
        detail: '',
    };

    if (!user) {
        return (
            <div className="container py-4 text-center">
                <h4 className="text-danger">You must be logged in to add or edit orchids.</h4>
            </div>
        );
    }
    return (
        <div className="container py-4">
            <Formik
                initialValues={{ ...defaults, ...(initialValues || {}) }}
                validationSchema={OrchidSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, values, handleChange }) => (
                    <Form className="card p-4">
                        <h3 className="mb-3">Orchid</h3>

                        <label className="form-label">Name</label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />

                        <label className="form-label mt-2">Origin</label>
                        <Field name="origin" className="form-control" />
                        <ErrorMessage name="origin" component="div" className="text-danger" />

                        <label className="form-label mt-2">Category</label>
                        <Field name="category" className="form-control" />
                        <ErrorMessage name="category" component="div" className="text-danger" />

                        <label className="form-label mt-2">Image URL</label>
                        <Field name="image" className="form-control" />
                        <ErrorMessage name="image" component="div" className="text-danger" />

                        <label className="form-label mt-2">Video URL (embed)</label>
                        <Field name="videoUrl" className="form-control" />
                        <ErrorMessage name="videoUrl" component="div" className="text-danger" />

                        <label className="form-label mt-2">Color</label>
                        <Field name="color" className="form-control" />

                        <label className="form-label mt-2">Rating</label>
                        <Field name="rating" type="number" min={0} max={5} className="form-control" />

                        <label className="form-label mt-2">Likes</label>
                        <Field name="numberOfLike" type="number" className="form-control" />

                        <div className="form-check form-switch mt-3">
                            <input
                                id="isSpecial"
                                type="checkbox"
                                name="isSpecial"
                                checked={values.isSpecial}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="isSpecial">Special</label>
                        </div>

                        <div className="form-check form-switch mt-2">
                            <input
                                id="isNatural"
                                type="checkbox"
                                name="isNatural"
                                checked={values.isNatural}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="isNatural">Natural</label>
                        </div>

                        <label className="form-label mt-3">Description</label>
                        <Field as="textarea" name="detail" className="form-control" rows={4} />

                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {submitLabel}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
