import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBrands } from './brandsOperations';
import type { BrandsState } from '../../types/rootState.types';
import type { Brand } from '../../types/brand.types';

const initialState: BrandsState = {
    items: [],
    isLoading: false,
    error: null,
};

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default brandsSlice.reducer;
