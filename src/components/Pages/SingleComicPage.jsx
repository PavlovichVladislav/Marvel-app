import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);
    const {error, loading, getComic} = useMarvelService();

    useEffect(() => {
        getComic(id)
            .then(setComic)
    }, [id])

    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && comic ? <ViewComic comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewComic = ({comic}) => {
    return (
        <div className="single-comic">
            <img src={comic.thumb} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.descr}</p>
                <p className="single-comic__descr">{comic.pages}</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;