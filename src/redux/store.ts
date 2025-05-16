import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import brandsReducer from './brands/brandsSlice';
import filtersReducer from './filters/filtersSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        brands: brandsReducer,
        filters: filtersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
