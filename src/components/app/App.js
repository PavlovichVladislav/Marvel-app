import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../Pages/MainPage";
import ComicsPage from "../Pages/ComicsPage";
import Page404 from "../Pages/404";
import SingleComicPage from "../Pages/SingleComicPage";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;

