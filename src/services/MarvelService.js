

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=d2cc7ff5a954a70a041930140599a31f';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?orderBy=name&limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(char => this._transformCharacter(char));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`).then(data => (data.data.results[0]));
        return this._transformCharacter(res);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;