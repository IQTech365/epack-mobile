import React, { useEffect, useState } from "react";
import {} from 'react-native';


const useFormValidation = (formFields:Object) => {
    const [errors, setErrors] = useState();
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    const validateForm = () => {
        let errors = {};
        const formKeys = Object.keys(formFields);
        formKeys.forEach((key:any) => {
            // if(!formFields[key]) {

            // }
        });
    }

    useEffect(() => {
        validateForm();
    }, [...Object.keys(formFields)]);
    
}