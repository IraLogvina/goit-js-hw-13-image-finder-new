const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22412207-a0ef56cb918658d27ea3da2a0';




export default class ApiPhoto {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPhoto() {
            const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);
        const { hits } = await response.json();
        this.incrementPage();
        return hits;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
