import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type {CarQueryParams, CarsResponse, Car} from '../../types/car.types';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk<CarsResponse, CarQueryParams | undefined>(
    'cars/fetchAll',
    async (params, { rejectWithValue }) => {
        try {
            const { brand, rentalPrice, minMileage, maxMileage, page = 1, limit = 12, append = false } = params || {};

            const response = await axios.get<CarsResponse>('/cars', {
                params: {
                    brand,
                    rentalPrice,
                    minMileage,
                    maxMileage,
                    page,
                    limit,
                },
            });
            return {
                cars: response.data.cars,
                totalCars: response.data.totalCars,
                page: response.data.page,
                totalPages: response.data.totalPages,
                append: append,
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message);
        }
    }
);

export const fetchCarById = createAsyncThunk<Car, string>(
    'cars/fetchById',
    async (carId, { rejectWithValue }) => {
        try {
            const response = await axios.get<Car>(`/cars/${carId.slice(1)}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message);
        }
    }
);
