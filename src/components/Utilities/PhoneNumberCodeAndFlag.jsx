import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import isValidPhoneNumber from 'libphonenumber-js'


export const PhoneNumberCodeAndFlag = ({ field, form, ...props }) => {

  const [countryDialCode, setCountryDialCode] = useState([]);

  const handleChange = async (value, country) => {
    setCountryDialCode(...country?.dialCode)
    await form.setFieldValue(field.name, "");
    form.setFieldValue(field.name, value);
    if (field.value === "")
      form.setFieldTouched(field.name, true)
    let errorMessage = value && !isValidPhoneNumber(value) ? 'Invalid phone number' : ""
    form.setFieldError(field.name, errorMessage);
    // console.log("isValidPhoneNumber=>", value, isValidPhoneNumber(value))
  };

  return (
    <React.Fragment>
      <PhoneInput
        country={'us'}
        {...field}
        {...props}
        value={field.value || ""}
        onChange={handleChange}
        enableSearch={false}
      />
    </React.Fragment>
  );
};