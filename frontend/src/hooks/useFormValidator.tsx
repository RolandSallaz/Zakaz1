import { ChangeEvent, useCallback, useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

function useFormValidator<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: event.target.validationMessage });
      const formElement = event.target.closest('form');
      if (formElement) {
        setIsValid(formElement.checkValidity());
      }
    },
    [values, errors]
  );

  const mutateValue = useCallback(
    ({ valueName, value }: { valueName: string; value: number | string }) => {
      setValues((prev) => ({ ...prev, [valueName]: value }) as T);
    },
    [values]
  );

  const resetForm = useCallback(
    (newValues = {}, newErrors: FormErrors = {}, newIsValid: boolean = false) => {
      setValues(newValues as T);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm, mutateValue };
}

export default useFormValidator;
