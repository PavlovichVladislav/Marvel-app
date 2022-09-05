import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../common/spinner/Spinner';
import Error from '../../common/error/Error';

import './singleCharPage.scss';
import AppBanner from '../../appBanner/AppBanner';

const SingleCharPage = () => {
    const { name } = useParams();
    const [char, setChar] = useState(null);
    const {error, loading, getCharacterByName} = useMarvelService();

    useEffect(() => {
        getCharacterByName(name)
            .then(setChar)
    }, [name])

    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <ViewChar char={char}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewChar = ({char}) => {
    return (
        <div className="single-char">
            <img src={char.thumb} alt={char.name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{char.name}</h2>
                <p className="single-char__descr">{char.descr}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;