import { create } from "zustand";

import type { OpenWeatherForecastResponse } from "@/typescript/weather";

type LocationDataStore = {
  data: OpenWeatherForecastResponse | null;
  error: string | null;
  loading: boolean;
  resetData: () => void;
  setFailure: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setSuccess: (data: OpenWeatherForecastResponse) => void;
};

const initialState = {
  data: null,
  error: null,
  loading: true,
};

export const useLocationDataStore = create<LocationDataStore>((set) => ({
  ...initialState,
  resetData: () => set(initialState),
  setFailure: (error) =>
    set({
      data: null,
      error,
      loading: false,
    }),
  setLoading: (loading) => set({ loading }),
  setSuccess: (data) =>
    set({
      data,
      error: null,
      loading: false,
    }),
}));
