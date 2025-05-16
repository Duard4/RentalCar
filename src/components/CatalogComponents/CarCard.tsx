import type {Car} from "../../types/car.types.ts";
import {Link} from "react-router-dom";
import { toggleFavorite } from "../../redux/cars/carsSlice";
import { selectIsFavorite } from "../../redux/cars/carsSelectors";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";

interface CarCardProps {
    car: Car
}

export const CarCard = ({car}: CarCardProps) => {
    const dispatch = useDispatch();
    const isFavorite:boolean = useSelector((state: RootState) => selectIsFavorite(state, car.id));

    let [city, country]: Array<String> = car.address.split(', ').slice(-2) ?? [];

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(car.id));
    };

    return (
        <>
            <div className="relative rounded-[14px] overflow-clip h-67 mb-4">
                <img src={car.img} alt={car.model} className="h-full w-full object-cover"/>
                <div className="gradient-overlay"></div>
                <svg
                    className={`absolute top-4 right-4 h-4 w-4 ${isFavorite ? 'text-primary ' : 'fill-white'} z-20 cursor-pointer`}
                    onClick={handleToggleFavorite}>
                        {
                            isFavorite ? ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>) : <use xlinkHref="/sprite.svg#heart"></use>
                        }
                </svg>
            </div>
            <div className="font-medium flex justify-between mb-2">
                <p className="">{car.brand} <span className="text-primary">{car.model}</span>, {car.year}</p>
                <p>${car.rentalPrice}</p>
            </div>
            <div className="grid gap-1 text-gray text-start text-[12px] leading-l">
                <div>{city} | {country} | {car.rentalCompany}</div>
                <div>
                    {car.type.toLowerCase()} | {car.mileage}km
                </div>
            </div>
            <Link to={`/catalog/:${car.id}`} className="bg-primary inline-block hover:bg-primary-hover py-3 rounded-xl font-semibold mt-auto h-fit transition-colors duration-300 text-white">Read more</Link>

        </>
    );
};