import  type { Car } from './car.types';
import type { Brand } from './brand.types';
import type {FilterState} from './filter.types';

export interface CarsState {
    items: Car[];
    favorites: string[];
    selectedCar: Car | null;
    isLoading: boolean;
    error: string | null;
    totalCars: number;
    currentPage: number;
    totalPages: number;
}

export interface BrandsState {
    items: Brand[];
    isLoading: boolean;
    error: string | null;
}

export interface RootState {
    cars: CarsState;
    brands: BrandsState;
    filters: FilterState;
}