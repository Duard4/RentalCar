import { NavLink, Link } from "react-router-dom";
import type {FC} from "react";

export const Header: FC = () => {
    return (
        <header className="bg-badges flex justify-between px-31.5 py-6.5">
            <Link to='/' className="self-center">
                <svg height="16" width="104">
                    <use xlinkHref="/sprite.svg#logo"></use>
                </svg>
            </Link>
            <nav>
                <ul className="flex gap-4 font-medium transition-colors duration-300">
                    <li className="mr-8 hover:text-primary-hover"><NavLink to='/'>Home</NavLink></li>
                    <li className="hover:text-primary-hover"><NavLink to='/catalog'>Catalog</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};