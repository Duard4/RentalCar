import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrandFilter, setPriceFilter, setMileageRange } from '../../redux/filters/filtersSlice';
import { fetchBrands } from '../../redux/brands/brandsOperations';
import { fetchCars } from '../../redux/cars/carsOperations';
import { selectBrands } from '../../redux/brands/brandsSelectors';
import { selectAllFilters } from '../../redux/filters/filtersSelectors';
import type { Brand } from '../../types/brand.types';
import type { AppDispatch } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import CustomSelect from "./CustomSelect.tsx";

export const FilterBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();

    const brands = useSelector(selectBrands);
    const filters = useSelector(selectAllFilters);

    // Initialize state from URL search params if available
    // @ts-ignore
    const [localMinMileage, setLocalMinMileage] = useState<string>(searchParams.get('minMileage') || filters.minMileage || ''
    );
    // @ts-ignore
    const [localMaxMileage, setLocalMaxMileage] = useState<string>(searchParams.get('maxMileage') || filters.maxMileage || ''
    );

    // Available price options
    const priceOptions: {value: string, label: string }[] = [
        {value: '30', label: 'To $30'},
        {value: '40', label: 'To $40'},
        {value: '50', label: 'To $50'},
        {value: '60', label: 'To $60'},
        {value: '70', label: 'To $70'},
        {value: '80', label: 'To $80'},
        {value: '90', label: 'To $90'},
        {value: '100', label: 'To $100'},
    ];
    const brandsOptions: {value: string, label: string }[] = brands.map((brand: Brand) => ({value: brand, label: brand}));


    // Fetch brands on component mount
    useEffect((): void => {
        dispatch(fetchBrands());
    }, [dispatch]);

    // Sync URL params with Redux state on component mount
    useEffect((): void => {
        const brand = searchParams.get('brand') || '';
        const price = searchParams.get('price') || '';
        const minMileage = searchParams.get('minMileage') || '';
        const maxMileage = searchParams.get('maxMileage') || '';

        // Update Redux state if URL params exist
        if (brand) dispatch(setBrandFilter(brand));
        if (price) dispatch(setPriceFilter(price));
        if (minMileage || maxMileage) {
            dispatch(setMileageRange({ min: minMileage, max: maxMileage }));
        }

        // Apply filters from URL params on load
        if (brand || price || minMileage || maxMileage) {
            dispatch(fetchCars({
                brand,
                rentalPrice: price,
                minMileage,
                maxMileage,
                page: '1',
                limit: '12',
                append: false
            }));
        }
    }, [dispatch]);

    // Update URL search params based on filters
    const updateUrlParams = (filterUpdates: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams);

        // Update or remove params based on values
        Object.entries(filterUpdates).forEach(([key, value]) => {
            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });

        // Update URL without causing page reload
        setSearchParams(newParams);
    };

    // Handle brand filter change
    const handleBrandChange = (value:string) => {
        dispatch(setBrandFilter(value));
        updateUrlParams({ brand: value });
    };

    // Handle price filter change
    const handlePriceChange = (value: string) => {
        dispatch(setPriceFilter(value));
        updateUrlParams({ price:value });
    };

    // Handle mileage input changes
    const handleMinMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinMileage(e.target.value);
    };

    const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxMileage(e.target.value);
    };

    // Apply all filters
    const handleApplyFilters = () => {
        // Update mileage range in redux
        dispatch(setMileageRange({ min: localMinMileage ?? '', max: localMaxMileage ?? '' }));

        // Update URL params for mileage
        updateUrlParams({
            minMileage: localMinMileage ?? '',
            maxMileage: localMaxMileage ?? ''
        });

        // Fetch filtered cars
        dispatch(fetchCars({
            brand: filters.brand,
            rentalPrice: filters.rentalPrice,
            minMileage: localMinMileage,
            maxMileage: localMaxMileage,
            page: '1',
            limit: '12',
        }));
    };

    return (
        <div className="flex  text-start mt-21 mb-14 gap-4 justify-center items-baseline">
            <div className="grid w-51  gap-2">
                    <label htmlFor="text-gray"  className="text-xs text-gray leading-l">Car brand</label>
                <CustomSelect
                    options={[{ value: '', label: 'Choose a brand' }, ...brandsOptions]}
                    value={filters.brand}
                    onChange={handleBrandChange}
                    placeholder="Select brand"
                    className="w-full"
                />
                </div>

            <div className="grid w-49  gap-2">
                    <label htmlFor="priceSelect"  className="text-xs text-gray leading-l">Price / 1 hour</label>
                    <CustomSelect
                        options={[{ value: '', label: 'Choose a price'}, ...priceOptions]}
                        start={'To $'}
                        value={filters.rentalPrice}
                        onChange={handlePriceChange}
                        placeholder="Select price range"
                        className="w-full"
                    />
                </div>

            <div className="grid gap-2">
                    <label  className="text-xs text-gray leading-l">Car mileage / km</label>
                    <div className="mileage-inputs">
                        <input
                            type="number"
                            placeholder="From"
                            value={localMinMileage}
                            onChange={handleMinMileageChange}
                            min="0"
                            className="w-40 bg-inputs rounded-tl-xl rounded-bl-xl px-4 py-3 border-r-gray-light border-r-[1px] border-solid"
                        />
                        <input
                            type="number"
                            placeholder="To"
                            value={localMaxMileage}
                            onChange={handleMaxMileageChange}
                            className="w-40 bg-inputs rounded-tr-xl rounded-br-xl px-4 py-3"
                            min="0"
                        />
                    </div>
                </div>

            <button
                className="bg-primary inline-block hover:bg-primary-hover py-3 px-13 rounded-xl font-semibold mt-auto h-fit transition-colors duration-300 text-white"
                onClick={handleApplyFilters}
            >
                        Search
                    </button>
        </div>
    );
};