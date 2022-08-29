import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getChars();
    }
    
    onCharsLoading = () => {
        this.setState({newItemsLoading: true});
    }
 
    onCharsLoaded = (newChars) => {
        this.setState(state => ({
            chars: [...state.chars, ...newChars],
            loading: false,
            newItemsLoading: false,
            offset: state.offset + 9,
            charEnded: newChars.length < 9 ? true: false
        }));
        
    }

    onError = () => {
        this.setState({error: true, loading: false});
    }

    getChars = (offset) => {
        this.onCharsLoading();
        this.marvelService.getAllCharacters(offset)
            .then(chars => this.onCharsLoaded(chars))
            .catch(this.onError);
    }

    render() {
        const {chars, loading, error, newItemsLoading, offset, charEnded} = this.state;
        const {selectChar, id} = this.props;
        
        let charList = [];

        if (chars.length !== 0) {
            charList = chars.map(char => {
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
        

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !loading && !error ? 
                            <View 
                                chars={charList} 
                                getChars={() => this.getChars(offset)} 
                                loading={newItemsLoading}
                                charEnded={charEnded}
                            /> : null;
                             
        return (
            <>
                {content || spinner || errorMessage}
            </>
        )
    }
}

const CharItem = ({name, thumb, selectChar, className}) => {
    const imgClass = thumb.includes('image_not_available') ? 'char__noImg' : 'char__Img';
    return (
        <li tabIndex='0' className={className} onClick={selectChar}>
            <img className={imgClass} src={thumb} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

const View = ({chars, getChars, loading, charEnded}) => {
    return (
        <div className="char__list">
                <ul className="char__grid">
                    {chars}
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

export default CharList;