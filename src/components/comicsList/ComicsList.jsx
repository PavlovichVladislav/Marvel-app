import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Error from '../common/error/Error';
import Spinner from '../common/spinner/Spinner';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const {loading, error, getComicsList} = useMarvelService();
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getNewComics(offset, true);
    }, [])

    const getNewComics = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComicsList(offset)
            .then(onCommicsLoaded);
        setOffset(offset => offset + 8);
    }

    const onCommicsLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setNewItemsLoading(false);
    }

    const renderComicsList = (comics) => {
        return comics.map((comic,i) => {
            const className = comic.thumb.includes('image_not_available') ? 'comics__item-noImg' : 'comics__item-img';

            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={comic.thumb} alt="ultimate war" className={className}/>
                        <div className="comics__item-name">{comic.name}</div>
                        <div className="comics__item-price">{comic.price}$</div>
                    </a>
                </li>
            )
        })
    }

    const errorMessage = error ? <Error/> : null;
    const spinner = loading && !newItemsLoading ? Array(8).fill(<Spinner/>) : null;
    const content = !error ? renderComicsList(comics) : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {content}
            </ul>
            <button 
                onClick={() => getNewComics(offset)} 
                className="button button__main button__long"
                disabled={loading}
            >
                <div className="inner" >load more</div>
            </button>
        </div>
    )
}

export default ComicsList;