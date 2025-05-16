import type {FC} from 'react';
import { CardGrid } from "../components/CatalogComponents/CardGrid";
import { FilterBar } from "../components/CatalogComponents/FilterBar";
import { LoadMore } from "../components/CatalogComponents/LoadMore";

export const CatalogPage: FC = () => {
    return (
        <section className="px-30">
            <FilterBar />
            <CardGrid />
            <LoadMore />
        </section>
    );
};