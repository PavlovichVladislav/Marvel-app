import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {
            name: null,
            descr: null,
            thumb: null,
            homepage: null,
            wiki: null,
        },
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        console.log('mount');
        this.getNewChar();
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    getNewChar = () => {
        this.setState({loading: true});
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <View char={char}/> : null;
        
        return (
            <div className="randomchar">
                {content || errorMessage || spinner}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main" 
                        onClick={this.getNewChar}
                        disabled={loading}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, descr, thumb, homepage, wiki} = char;
    const imgClass = thumb.includes('image_not_available') ? 'randomchar__noImg' : 'randomchar__img';

    return (
        <div className="randomchar__block">
            <img src={thumb} alt="Random character" className={imgClass}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;