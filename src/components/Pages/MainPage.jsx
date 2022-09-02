import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../common/errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [charId, setCharId] = useState(null);

    return (
        <>
            <ErrorBoundary>
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
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;