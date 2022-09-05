import './charInfo.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';
import CharForm from '../charForm/CharForm';

const CharInfo = ({id}) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [id])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        if (!id) return;

        clearError();
        getCharacter(id)
            .then(char => onCharLoaded(char))
    }
    
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && char ? <View {...char} /> : null;

    return (
        <div className='char__rightColumn'>
            <div className="char__info">
                {content || spinner || errorMessage || <Skeleton/>}
            </div>
            <CharForm/>
        </div>
    )
}

const View = ({comics, name, descr, homepage, thumb, wiki}) => {
    const comicsList = comics.map((comic,i) => {
        if (i>9) return null;
        return (
            <li className="char__comics-item" key={comic.name}>
                {comic.name}
            </li>
        )
    })

    let imgStyle = {'objectFit' : 'cover'};
    if (thumb.includes('image_not_available')) {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumb} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length === 0 ? 'This character did not appear in the comics.' : comicsList}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;