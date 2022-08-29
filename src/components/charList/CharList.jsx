import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

class CharList extends Component {
    state = {
        chars: null,
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.getChars();
    }
    
    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false});
    }

    onError = () => {
        this.setState({error: true, loading: false});
    }

    getChars = () => {
        this.marvelService.getAllCharacters()
            .then(chars => this.onCharsLoaded(chars))
            .catch(this.onError);
    }

    render() {
        const {chars, loading, error} = this.state;
        const {selectChar, id} = this.props;
        
        let charList = [];

        if (chars) {
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
        const content = !loading && !error ? <View chars={charList}/> : null;
                             

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

const View = ({chars}) => {
    return (
        <div className="char__list">
                <ul className="char__grid">
                    {chars}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
    )
}

export default CharList;