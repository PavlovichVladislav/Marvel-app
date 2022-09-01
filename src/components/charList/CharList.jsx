import './charList.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

const CharList = ({selectChar, id}) => {
    const [chars, setChars] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {error, loading, getAllCharacters} = useMarvelService();
 
    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(newChars.length < 9 ? true: false);
    }

    const getChars = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(chars => onCharsLoaded(chars))
    }

    useEffect(() => {
        getChars(offset, true);
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

    const items = renderCharList(chars);

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <Error/> : null;
    const content = !error 
    ?  <View 
            charList={items} 
            getChars={() => getChars(offset)} 
            loading={newItemsLoading}
            charEnded={charEnded}
        /> 
    : null;
                            
    return (
        <>  
            {spinner}
            {content}
            {errorMessage}
        </>
    )
}

const View = ({charList, getChars, loading, charEnded}) => {
    if (!charList) return null;
    return (
        <div className="char__list">
                <ul className="char__grid">
                    {charList}
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