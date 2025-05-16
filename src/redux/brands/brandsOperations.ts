import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { Brand } from '../../types/brand.types';

export const fetchBrands = createAsyncThunk<Brand[]>(
    'brands/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Brand[]>('/brands');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message);
        }
    }
);
