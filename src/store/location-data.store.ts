import { create } from "zustand";

import type {
  ForecastCoordinates,
  OpenWeatherForecastResponse,
} from "@/typescript/weather";

type LocationDataStore = {
  coords: ForecastCoordinates | null;
  data: OpenWeatherForecastResponse | null;
  error: string | null;
  loading: boolean;
  resetData: () => void;
  setFailure: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setSuccess: (payload: {
    coords: ForecastCoordinates;
    data: OpenWeatherForecastResponse;
  }) => void;
};

const initialState = {
  coords: null,
  data: null,
  error: null,
  loading: true,
};

export const useLocationDataStore = create<LocationDataStore>((set) => ({
  ...initialState,
  resetData: () => set(initialState),
  setFailure: (error) =>
    set({
      coords: null,
      data: null,
      error,
      loading: false,
    }),
  setLoading: (loading) => set({ loading }),
  setSuccess: ({ coords, data }) =>
    set({
      coords,
      data,
      error: null,
      loading: false,
    }),
}));
