import { lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../common/spinner/Spinner";

const Page404 = lazy(() => import('../Pages/404/404'));
const MainPage = lazy(() => import('../Pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('../Pages/comicsPage/ComicsPage'));
const SingleComicPage = lazy(() => import('../Pages/singleComicPage/SingleComicPage'));
const SingleCharPage = lazy(() => import('../Pages/singleCharPage/SingleCharPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SingleComicPage/>}/>
                            <Route path="/characters/:name" element={<SingleCharPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;

