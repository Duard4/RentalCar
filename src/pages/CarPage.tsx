import type {FC} from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCarById } from '../redux/cars/carsOperations';
import { selectSelectedCar, selectIsLoading } from '../redux/cars/carsSelectors';
import { useAppDispatch } from '../redux/store';
import { useParams } from "react-router-dom";
import { RentForm } from "../components/RentFormComponents/RentForm";
import { Loader } from "../components/Loader";
import { CarHeader } from '../components/CarDetailsComponents/CarHeader';
import { CarSpecifications } from '../components/CarDetailsComponents/CarSpecifications';


export const CarPage: FC = ()  => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(selectIsLoading);
    const { id: carId = "" } = useParams<{ id: string }>();
    const car = useSelector(selectSelectedCar);

    useEffect(() => {
        if (carId) {
            dispatch(fetchCarById(carId));
        }
    }, [dispatch, carId]);

    if (isLoading) return <Loader />;
    if (!car) return <p>Car not found</p>;

    return (
        <section className="px-30 flex gap-x-18 mt-21 pb-26">
            <div className="grid shrink-0">
                <img
                    src={car.img}
                    alt={`${car.brand} ${car.model}`}
                    className="w-155 h-128 rounded-[19px] mb-10"
                />
                <RentForm />
            </div>

            <div className="grid mt-5 text-start">
                <CarHeader car={car} />
                <CarSpecifications car={car} />
            </div>
        </section>
    );
};