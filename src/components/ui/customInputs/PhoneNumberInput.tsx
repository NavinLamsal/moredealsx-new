"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Input } from '../input';
import { getCountryList } from '@/lib/action/PubilcCommon';
import { CountryListType } from '@/lib/type/CommonType';


interface PhoneNumberInputProps {
    onChange: (data: PhoneNumberData) => void;
    initialValue?: string;
    disabled?: boolean;
}

interface PhoneNumberData {
    fullNumber: string;
    prefix: string | null;
    phone: string;
    country?: number;
    countryCode?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onChange, initialValue = '', disabled}) => {
    const [phoneNumber, setPhoneNumber] = useState<string>(initialValue);
    const [countryList, setCountryList] = useState<CountryListType[]>([]);
    const [country, setCountry] = useState<CountryListType | null>(null);
    const [prefix, setPrefix] = useState<string>('');
    const [error, setError] = useState<string>('');

    
    // Fetch and cache the country list on mount
    useEffect(() => {
        (async () => {
            try {
                const countries = await getCountryList();
                console.log(countries);
                setCountryList(countries);
            } catch (err) {
                console.error('Failed to load countries:', err);
            }
        })();
    }, []);


    // Synchronize country and phone number
    useEffect(() => {
        if (countryList.length === 0) return;

        const matchedCountry = countryList.find((c) => phoneNumber.startsWith(c.prefix_number));
        if (matchedCountry) {
            setCountry(matchedCountry);
            setPrefix(matchedCountry.prefix_number);
        } else if (!phoneNumber) {
            const defaultCountry = countryList[0];
            setCountry(defaultCountry);
            setPhoneNumber(defaultCountry.prefix_number);
        }
    }, [countryList, phoneNumber]);

    // Validate the phone number
    const validatePhoneNumber = useCallback((phoneNumber: string): string | null => {
        const phoneRegex = /^[1-9]\d{9,14}$/;
        if (!phoneNumber) return 'Phone number is required';
        if (!phoneRegex.test(phoneNumber)) return 'Invalid phone number';
        return null;
    }, []);

    // Handle phone number changes
    const handlePhoneNumberChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            const validationError = validatePhoneNumber(input);
            setError(validationError || '');
            setPhoneNumber(input);

            const matchedCountry = countryList.find((c) => input.startsWith(c.prefix_number));
            if (matchedCountry) {
                setCountry(matchedCountry);
                setPrefix(matchedCountry.prefix_number);
                onChange({
                    fullNumber: input,
                    prefix: matchedCountry.prefix_number,
                    phone: input.replace(`${matchedCountry.prefix_number}`, ''),
                    country: matchedCountry.id,
                    countryCode: matchedCountry.code,
                });
            } else {
                if (input.length > 4) setError('Invalid country code');
                setPrefix('');
                setCountry(null);
                onChange({
                    fullNumber: input,
                    prefix: null,
                    phone: input,
                    country: undefined,
                    countryCode: undefined,
                });
            }
        },
        [countryList, onChange, validatePhoneNumber]
    );

    // Handle country selection changes
    const handleCountryChange = (selectedPrefix: string) => {
        const matchedCountry = countryList.find((c) => c.prefix_number === selectedPrefix);
        if (matchedCountry) {
            setCountry(matchedCountry);
            setPrefix(matchedCountry.prefix_number);
            setPhoneNumber(matchedCountry.prefix_number);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="flex gap-2 w-full items-center">
                <select
                    id="phonePrefixSelect"
                    value={prefix}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-16 bg-transparent border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={disabled}
                >
                    {countryList.map((c) => (
                        <option key={c.code} value={c.prefix_number}>
                            {c.code}
                        </option>
                    ))}
                </select>
                <Input
                    type="text"
                    id="phoneLoginUsername"
                    placeholder="Enter phone number with country code"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className={`flex-1 border border-gray-300 rounded-md p-2  `}
                    required
                    disabled={disabled}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default PhoneNumberInput;
