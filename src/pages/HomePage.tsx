import type {FC} from 'react';
import { Link } from "react-router-dom";

export const HomePage: FC = () => {
    return (
        <section className="bg-image text-white">
            <h1 className="font-bold text-6xl pt-109 mb-4 leading-s">Find your perfect rental car</h1>
            <h2 className="text-2xl mb-10 leading-l">Reliable and budget-friendly rentals for any journey</h2>
            <Link
                to="/catalog"
                className="bg-primary inline-block hover:bg-primary-hover p-4 rounded-xl font-semibold w-69 py-3 mb-15 transition-colors duration-300 relative z-10 cursor-pointer"
            >
                View Catalog
            </Link>
        </section>
    );
};