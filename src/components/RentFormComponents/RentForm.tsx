// RentCarForm.tsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import toast from 'react-hot-toast';
import { FormField } from './FormField';
import { DatePickerField } from './DatePickerField';

interface RentCarFormValues {
    name: string;
    email: string;
    date?: string;
    comment?: string;
}

const validationSchema: Yup.ObjectSchema<RentCarFormValues> = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    date: Yup.string(),
    comment: Yup.string(),
});

export const RentForm: React.FC = () => {
    const initialValues: RentCarFormValues = {
        name: '',
        email: '',
        date: '',
        comment: '',
    };

    const handleSubmit = (
        values: RentCarFormValues,
        { resetForm }: { resetForm: () => void }
    ): void => {
        console.log('Submitted values:', values);
        toast.success('Your booking has been sent!');
        resetForm();
    };

    return (
        <div className="grid text-start form-grid rounded-lg p-8">
            <h3 className="font-bold text-xl mb-2 leading-s">Book your car now</h3>
            <p className="text-gray mb-6">Stay connected! We are always ready to help you.</p>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="grid w-full gap-y-4">
                        <FormField
                            name="name"
                            label="Name"
                            placeholder="Name*"
                            required
                        />

                        <FormField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Email*"
                            required
                        />

                        <DatePickerField
                            name="date"
                            label="Booking Date"
                            placeholder="Booking Date"
                        />

                        <FormField
                            name="comment"
                            label="Comment"
                            as="textarea"
                            className="form-textarea"
                            placeholder="Comment"
                        />

                        <button
                            type="submit"
                            className="mt-4 mx-auto bg-primary text-white py-3 px-14.5 rounded-xl font-semibold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};