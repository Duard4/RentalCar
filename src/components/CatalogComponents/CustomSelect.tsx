import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
    options: { value: string; label: string}[];
    start?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       options,
                                                        start,
                                                       value,
                                                       onChange,
                                                       placeholder = 'Select an option',
                                                       className = '',
                                                   }) => {
    // @ts-ignore
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Find the currently selected option label
    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle option selection
    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // Custom arrow SVG component
    const ArrowIcon = () => (
        <svg className="h-4 w-4">
            <use xlinkHref="/sprite.svg#arrow-up" className="absolute t-0 l-0 translate-y-[25%]"></use>
        </svg>
    );

    return (
        <div ref={selectRef} className="relative w-full">
            {/* Hidden native select for accessibility and form submission */}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                aria-hidden="true"
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {start}{option.value}
                    </option>
                ))}
            </select>

            {/* Custom select trigger button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-inputs rounded-xl px-4 py-3 cursor-pointer flex justify-between items-center ${className}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                role="combobox"
            >
        <span className={value ? 'text-main' : 'text-gray'}>
          {displayValue}
        </span>
                <ArrowIcon />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="absolute text-gray z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-inputs max-h-60 overflow-auto"
                    role="listbox"
                >
                    {options.map(option => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                option.value === value ? 'text-main' : ''
                            }`}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;