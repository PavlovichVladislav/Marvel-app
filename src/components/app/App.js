import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../common/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [charId, setCharId] = useState(null);
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList id={charId} selectChar={setCharId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo id={charId}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;