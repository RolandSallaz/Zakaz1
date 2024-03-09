import { useDispatch } from 'react-redux';
import { openSnackBar } from '../services/slices/appSlice';
import { useCallback } from 'react';
import { IRequestError } from '../utils/types';

export default function useErrorHandler() {
  const dispatch = useDispatch();

  const handleError = useCallback(
    ({ message, statusCode = 502 }: IRequestError) => {
      dispatch(openSnackBar({ message: `${statusCode} ${message}`, isError: true }));
    },
    [dispatch]
  );

  return { handleError };
}
