import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/carsOperations.ts';
import { selectCars, selectIsLoading } from '../../redux/cars/carsSelectors.ts';
import { selectAllFilters } from '../../redux/filters/filtersSelectors.ts';
import { useAppDispatch } from '../../redux/store.ts';
import type {Car} from '../../types/car.types.ts';
import {CarCard} from "./CarCard.tsx";
import {Loader} from "../Loader.tsx";
import {nanoid} from "@reduxjs/toolkit";

export const CardGrid = () => {
    const dispatch = useAppDispatch();
    const cars: Car[] = useSelector(selectCars);
    const isLoading = useSelector(selectIsLoading);
    const filters = useSelector(selectAllFilters);

    useEffect(() => {
        dispatch(fetchCars(filters));
    }, [dispatch, filters]);

    if (isLoading) return <Loader/>;
    if (!cars.length) return <p>No car was found!</p>;

    return (
        <ul className="grid grid-cols-4 gap-x-8 gap-y-12">
            {cars.map((car) => (
                <li key={nanoid()} className="grid h-106">
                    <CarCard car={car} />
                </li>
            ))}
        </ul>
    );
};