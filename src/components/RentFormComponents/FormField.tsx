import { Field, ErrorMessage } from 'formik';
import React from 'react';

interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    as?: string;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                        name,
                                                        label,
                                                        type = 'text',
                                                        placeholder,
                                                        required = false,
                                                        as,
                                                        className = 'form-input'
                                                    }) => (
    <div className="field">
        <label htmlFor={name}>
            {label}
            {required && '*'}
        </label>
        <Field
            name={name}
            type={type}
            as={as}
            className={className}
            placeholder={placeholder}
        />
        <ErrorMessage name={name} component="div" className="text-red-600 text-sm" />
    </div>
);