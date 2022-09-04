import './charList.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
        return (
            chars.map(char => {
                const className = char.id === id ? 'char__item char__item_selected' : 'char__item';
                return (
                    <CSSTransition
                        key={char.id}
                        timeout={1000}
                        classNames="char__item"
                        unmountOnExit
                        mountOnEnter
                    >
                        <CharItem 
                            selectChar={() => selectChar(char.id)}
                            key={char.id} 
                            name={char.name} 
                            thumb={char.thumb}
                            className={className}
                        />
                    </CSSTransition>
                )
            })
        )
    }

    const items = renderCharList(chars);

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <Error/> : null;
    const content = !error && (<View 
            charList={items} 
            getChars={() => getChars(offset)} 
            loading={newItemsLoading}
            charEnded={charEnded}
        /> )

    return (
        <>  
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
            </div>
        </>
    )
}

const View = ({charList, getChars, loading, charEnded}) => {
    return (
        <>
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {charList}
                </TransitionGroup>
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
        </>
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