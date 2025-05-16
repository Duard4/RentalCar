import type { RootState } from '../store';
import type { Brand } from '../../types/brand.types';

export const selectBrands = (state: RootState): Brand[] => state.brands.items;
export const selectBrandsLoading = (state: RootState): boolean => state.brands.isLoading;
export const selectBrandsError = (state: RootState): string | null => state.brands.error;
