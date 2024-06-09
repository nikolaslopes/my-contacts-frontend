import { useCallback, useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(
    ({ field, message }) => {
      const errorAlreadyExists = errors.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field, message }]);
    },
    [errors],
  );

  const removeError = useCallback((fieldName) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName),
    );
  }, []);

  const getErrorMessagesByFieldName = useCallback(
    (fieldName) => {
      const error = errors.find((error) => error.field === fieldName);

      return error?.message;
    },
    [errors],
  );

  return { setError, removeError, getErrorMessagesByFieldName, errors };
}
