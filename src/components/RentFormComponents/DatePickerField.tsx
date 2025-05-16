import { useField } from 'formik';
import React, { useState } from 'react';

interface DatePickerFieldProps {
    name: string;
    label: string;
    placeholder: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
                                                                    name,
                                                                    label,
                                                                    placeholder
                                                                }) => {
    const [field, meta] = useField<string>(name);
    // @ts-ignore
    const [inputType, setInputType] = useState<'text' | 'date'>('text');

    return (
        <div className="field">
            <label htmlFor={name}>{label}</label>
            <input
                {...field}
                id={name}
                type={inputType}
                className="form-input"
                placeholder={placeholder}
                onFocus={() => setInputType('date')}
                onBlur={(e) => {
                    field.onBlur(e);
                    if (!field.value) {
                        setInputType('text');
                    }
                }}
            />
            {meta.touched && meta.error && (
                <div className="text-red-600 text-sm">{meta.error}</div>
            )}
        </div>
    );
};