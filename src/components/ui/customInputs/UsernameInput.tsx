"use client";
import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { Input } from '../input';

// Define types for input data and props
type InputType = 'username' | 'email' | 'phone';

interface InputData {
    value: string;
    type: InputType;
    isValid: boolean;
}

interface UsernameInputProps {
    onChange: (data: InputData) => void;
    initialValue?: string;
    customErrors?: {
        username?: string;
        email?: string;
        phone?: string;
    };
    initialError?: string;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
    onChange,
    initialValue = '',
    customErrors = {},
    initialError = '',
}) => {
    const [inputValue, setInputValue] = useState<string>(initialValue);
    const [error, setError] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);

    // Validation functions
    const validateUsername = (value: string): boolean => /^[a-zA-Z0-9_]{3,15}$/.test(value);
    const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const validatePhoneNumber = (value: string): boolean => /^\+?[1-9]\d{7,14}$/.test(value);

    // Determine the input type
    const getInputType = useCallback((value: string): InputType => {
        if (validateEmail(value)) return 'email';
        if (validatePhoneNumber(value)) return 'phone';
        return 'username';
    }, []);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Mark input as touched after the first change
        if (!isTouched) setIsTouched(true);

        const inputType = getInputType(value);
        let isValid = false;

        switch (inputType) {
            case 'username':
                isValid = validateUsername(value);
                setError(isValid ? '' : customErrors.username || 'Invalid username.');
                break;
            case 'email':
                isValid = validateEmail(value);
                setError(isValid ? '' : customErrors.email || 'Invalid email address.');
                break;
            case 'phone':
                isValid = validatePhoneNumber(value);
                setError(isValid ? '' : customErrors.phone || 'Invalid phone number.');
                break;
        }

        // Notify parent component with the input data
        onChange({ value, type: inputType, isValid });
    };

    // Set the initial error on component mount (only if there is an error and input is already touched)
    useEffect(() => {
        if (initialError && inputValue) {
            setError(initialError);
            setIsTouched(true); // Assume it's already touched if there's an initial value and error
        }
    }, [initialError, inputValue]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Input
                type="text"
                placeholder="Enter username, email, or phone number"
                value={inputValue}
                onChange={handleChange}
                onBlur={() => setIsTouched(true)} // Mark input as touched on blur
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                required
            />

            {/* Only show error message if the input is touched */}
            {isTouched && error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default UsernameInput;
