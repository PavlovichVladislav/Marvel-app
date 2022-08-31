import './charList.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

const CharList = ({selectChar, id}) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    const onCharsLoading = () => {
        setNewItemsLoading(true);
    }
 
    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(newChars.length < 9 ? true: false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const getChars = (offset) => {
        onCharsLoading();
        marvelService.getAllCharacters(offset)
            .then(chars => onCharsLoaded(chars))
            .catch(onError);
    }

    useEffect(() => {
        getChars();
    },[])

    const renderCharList = (chars) => {
        if (chars.length !== 0) {
            return chars.map(char => {
                const className = char.id === id ? 'char__item char__item_selected' : 'char__item';
                return (
                    <CharItem 
                        selectChar={() => selectChar(char.id)}
                        key={char.id} 
                        name={char.name} 
                        thumb={char.thumb}
                        className={className}
                    />
                )
            })
        }

        return null;
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <Error/> : null;
    const content = !loading && !error ? 
                        <View 
                            renderCharList={() => renderCharList(chars)} 
                            getChars={() => getChars(offset)} 
                            loading={newItemsLoading}
                            charEnded={charEnded}
                        /> : null;
                            
    return (
        <>
            {content || spinner || errorMessage}
        </>
    )
}

const View = ({renderCharList, getChars, loading, charEnded}) => {
    return (
        <div className="char__list">
                <ul className="char__grid">
                    {renderCharList()}
                </ul>
                {!charEnded ? 
                    <button 
                    className="button button__main button__long" 
                    onClick={getChars} 
                    disabled={loading}
                    >
                        <div className="inner">load more</div>
                    </button>
                    : null
                }
            </div>
    )
}

const CharItem = ({name, thumb, selectChar, className}) => {
    const imgClass = thumb.includes('image_not_available') ? 'char__noImg' : 'char__Img';
    return (
        <li 
            tabIndex='0' 
            className={className} 
            onClick={selectChar} 
            onKeyUp={(e) => {
                if (e.code === 'Enter') selectChar();
            }}
        >
            <img className={imgClass} src={thumb} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    selectChar: PropTypes.func.isRequired
}

export default CharList;