import type { RootState } from '../store';
import type { FilterState } from '../../types/filter.types';

export const selectBrandFilter = (state: RootState): string => state.filters.brand;
export const selectPriceFilter = (state: RootState): string => state.filters.rentalPrice;
export const selectMinMileageFilter = (state: RootState): string => state.filters.minMileage;
export const selectMaxMileageFilter = (state: RootState): string => state.filters.maxMileage;
export const selectAllFilters = (state: RootState): FilterState => state.filters;
