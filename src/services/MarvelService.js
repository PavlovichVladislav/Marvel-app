import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e8bec96cf5c818c52d8be63695c71a63';
    const _offset = 210;

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?orderBy=name&limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(char => _transformCharacter(char));
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
            .then(data => (data.data.results[0]));
        return _transformCharacter(res);
    }

    const getComicsList = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
            .then(data => data.data.results);
        return res.map(comic => _transformComic(comic));
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
            .then(data => data.data.results[0]);
        return _transformComic(res);
    }   
    
    const _transformCharacter = (char) => {
        return {
            name: char.name,
            descr: char.description ? `${char.description.slice(0,210)}...` : 'There is no description for this character.',
            thumb: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    
    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            thumb: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price === 0 ? 'not for sale' : `${comic.prices[0].price}$`,
            descr: comic.description || "There is no description for this character",
            pages: comic.pageCount,
            language: comic.textObjects.language || "en-us",
        }       
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComicsList, getComic}
}

export default useMarvelService;