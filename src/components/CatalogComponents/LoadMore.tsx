import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store.ts";
import { fetchCars } from "../../redux/cars/carsOperations.ts";
import { selectAllFilters } from "../../redux/filters/filtersSelectors.ts";
import {selectCurrentPage, selectTotalPages} from "../../redux/cars/carsSelectors.ts";

export const LoadMore = () => {
    const dispatch = useAppDispatch();
    const filters = useSelector(selectAllFilters);
    const currentPage:number = Number(useSelector(selectCurrentPage));
    const totalPages:number = Number(useSelector(selectTotalPages));

    const hasMorePages = currentPage < totalPages;

    const handleLoadMore = () => {
        dispatch(fetchCars({ ...filters, page: String(currentPage + 1), append: true }));
    };

    if (!hasMorePages) return null;

    return (
        <button
            onClick={handleLoadMore}
            className="font-semibold py-3 px-9.5 border-2 border-primary mt-20 rounded-xl mb-31"
        >
            Load more
        </button>
    );
};
