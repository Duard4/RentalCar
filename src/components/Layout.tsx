import { Header } from "./Header";
import { Suspense, type ReactNode } from "react";
import { Loader } from "./Loader";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Suspense fallback={<div><Loader /></div>}>
            <Header />
            <main>
                {children}
            </main>
            <footer></footer>
        </Suspense>
    );
};