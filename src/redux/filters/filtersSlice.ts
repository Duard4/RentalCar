import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, MileageRange } from '../../types/filter.types';

const initialState: FilterState = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setBrandFilter: (state, action: PayloadAction<string>) => {
            state.brand = action.payload;
        },
        setPriceFilter: (state, action: PayloadAction<string>) => {
            state.rentalPrice = action.payload;
        },
        setMileageRange: (state, action: PayloadAction<MileageRange>) => {
            state.minMileage = action.payload.min;
            state.maxMileage = action.payload.max;
        },
        resetFilters: (state) => {
            state.brand = '';
            state.rentalPrice = '';
            state.minMileage = '';
            state.maxMileage = '';
        },
    },
});

export const { setBrandFilter, setPriceFilter, setMileageRange, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
