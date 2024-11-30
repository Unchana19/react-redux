import type { AsyncThunk } from "@reduxjs/toolkit";
import { useState, useCallback } from "react";
import { type AnyIfEmpty, useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

export function useThunk<T>(thunk: AsyncThunk<T, AnyIfEmpty<object>, object>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(
    (arg?: unknown) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: Error) => setError(err.message))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return { runThunk, isLoading, error };
}
