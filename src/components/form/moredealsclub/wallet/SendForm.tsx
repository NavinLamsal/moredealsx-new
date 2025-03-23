"use client"
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput'
import UsernameInput from '@/components/ui/customInputs/UsernameInput';
import React, { useState } from 'react'

const SendForm = () => {

    const [phone_number, setPhoneNumber] = useState("");
    const [inputData, setInputData] = useState("");
    const handlePhoneNumberChange = (data: any) => {
        // if (data.prefix === undefined || data.country === undefined || data.countryCode === undefined) {
        //   setphoneInputInfo((prevData) => ({
        //     ...prevData,
        //     phone_number: data.fullNumber,
        //   }));
        // } else {
        //   setPhoneNumber(data.fullNumber);
        //   setPrefixs(data.prefix);
        //   setphoneInputInfo((prevData) => ({
        //     ...prevData,
        //     phone_number: data.fullNumber,
        //     phone_prefix: data.prefix,
        //     country_code: data.countryCode,
        //     country: data.country,
        //   }));
        //   dispatch(
        //     updateFormData({
        //       phone_number: data.fullNumber,
        //       phone_prefix: data.prefix,
        //       country_code: data.countryCode,
        //       country: data.country,
        //     })
        //   );
        //   handlePhoneCheck(data.fullNumber);
        // }
    
      };

      const handleInputChange = (data: { value: string; type: 'username' | 'email' | 'phone'; isValid: boolean }) => {
        setInputData(data.value);
    };

  return (
    <div>
        

      {/* <PhoneNumberInput
          onChange={handlePhoneNumberChange}
          initialValue={phone_number}
        />
        <UsernameInput
                onChange={handleInputChange}
                initialValue={inputData}       // Initial input value
                initialError=""  // Initial error message (optional)
            /> */}
    </div>
  )
}

export default SendForm
