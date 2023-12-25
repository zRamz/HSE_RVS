import {useEffect, useState} from "react";

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }
    return {
        value,
        onChange,
        onBlur,
        setValue,
        isDirty,
        setDirty,
        ...valid,
    }
}

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [isDigitError, setIsDigitError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {

                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;

                case 'isDigit':
                    const regDIgit = /\d/g;
                    regDIgit.test(String(value)) ? setIsDigitError(false) : setIsDigitError(true);

            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty) {
            setInputValid(false)
        } else {
            setInputValid(true);
        }
    }, [isEmpty])

    return {
        isEmpty,
        isDigitError,
        inputValid
    }
}
export {useInput, useValidation};