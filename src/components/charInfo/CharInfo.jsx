import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../common/spinner/Spinner';
import Error from '../common/error/Error';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        console.log('mount');
        this.updateChar();
    }

    onCharLoading = () => {
        this.setState({loading: true});
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    updateChar = () => {
        const {id} = this.props;
        if (!id) {
            return;
        }
        this.marvelService
            .getCharacter(id)
            .then(char => this.onCharLoaded(char))
            .catch(this.onError);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            console.log('update');
            this.updateChar();
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({error: true});
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error && char ? <View {...char} /> : null;

        return (
            <div className="char__info">
                {content || spinner || errorMessage || <Skeleton/>}
            </div>
        )
    }
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

export default CharInfo;