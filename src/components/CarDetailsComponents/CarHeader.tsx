import type {Car} from '../../types/car.types.ts';

interface CarHeaderProps {
    car: Car;
}

export const CarHeader = ({ car }: CarHeaderProps) => {
    const [city, country] = car.address.split(', ').slice(-2);
    const formattedMileage = car.mileage > 1000
        ? `${Math.floor(car.mileage / 1000)} ${car.mileage % 1000}`
        : car.mileage;

    return (
        <div className="mb-12">
            <h1 className="text-2xl font-bold mb-2 leading-l">
                {car.brand} {car.model}, {car.year}
                <span className="ml-4 text-4 text-gray leading-m">
          Id: {car.id.match(/\d/g)?.slice(-4)}
        </span>
            </h1>
            <p className="flex items-center">
                <svg className="h-4 w-4 fill-main">
                    <use xlinkHref="/sprite.svg#location"></use>
                </svg>
                <span className="ml-1 mr-4">
          {city}, {country}
        </span>
                <span>Mileage: {formattedMileage} km</span>
            </p>
            <p className="text-primary font-semibold mt-4 mb-8 text-2xl leading-l">
                ${car.rentalPrice}
            </p>
            <p>{car.description}</p>
        </div>
    );
};