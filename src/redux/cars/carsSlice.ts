import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from './carsOperations';
import type {CarsState} from '../../types/rootState.types';
import type {Car, CarsResponse} from '../../types/car.types';

// Load favorites from localStorage on initialization
const loadFavoritesFromStorage = (): string[] => {
    try {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
    }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites: string[]) => {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
    }
};

const initialState: CarsState = {
    items: [],
    favorites: loadFavoritesFromStorage(),
    selectedCar: null,
    isLoading: false,
    error: null,
    totalCars: 0,
    currentPage: 1,
    totalPages: 1,
};

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        clearSelectedCar: (state) => {
            state.selectedCar = null;
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const carId = action.payload;
            const index = state.favorites.indexOf(carId);

            if (index === -1) {
                // Add to favorites
                state.favorites.push(carId);
            } else {
                // Remove from favorites
                state.favorites.splice(index, 1);
            }

            // Save to localStorage
            saveFavoritesToStorage(state.favorites);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cars
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action: PayloadAction<CarsResponse>) => {
                state.isLoading = false;
                action.payload.append ? state.items.push(...action.payload.cars) : state.items = action.payload.cars;
                state.totalCars = action.payload.totalCars;
                state.currentPage = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch a car by ID
            .addCase(fetchCarById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCarById.fulfilled, (state, action: PayloadAction<Car>) => {
                state.isLoading = false;
                state.selectedCar = action.payload;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedCar, toggleFavorite } = carsSlice.actions;
export default carsSlice.reducer;
