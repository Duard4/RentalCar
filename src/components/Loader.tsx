import { PuffLoader } from "react-spinners";
import type {FC} from "react";

export const Loader: FC = () => {
    return (
        <div className="py-40 flex justify-center">
            <PuffLoader color="#3470ff" />
        </div>
    );
};