import type {RootState} from '../store';
import type {Car} from '../../types/car.types';

export const selectCars = (state: RootState): Car[] => state.cars.items;
export const selectSelectedCar = (state: RootState): Car | null => state.cars.selectedCar;
export const selectIsLoading = (state: RootState): boolean => state.cars.isLoading;
export const selectError = (state: RootState): string | null => state.cars.error;
export const selectCurrentPage = (state: RootState): number => state.cars.currentPage;
export const selectTotalPages = (state: RootState): number => state.cars.totalPages;
export const selectIsFavorite = (state: RootState, carId: string): boolean =>
    state.cars.favorites.includes(carId);