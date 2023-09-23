import axios from "axios";

export default class SearchApiService {
    #BASE_URL = 'https://pixabay.com/api/';
    #KEY = "39538496-5692811f32f5eeb2890664c8c";

    constructor() {
        this.searchInput = '';
        this.page = 1;   
        this.totalHitsNumber = null;
        this.perPage = 40;
    }

    async fetchImages() {

      
        const result = await axios.get(`${this.#BASE_URL}?`, {
            params: {
            key: this.#KEY,
            q: this.searchInput,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: this.perPage,
            page: this.page,
            },
        });
        
        this.totalHitsNumber = result.data.totalHits;
        
        return result;
    }


    incrementPage() {
        this.page += 1;
    }
        
    resetPage() {
        this.page = 1;
    }


    get input() {
        return this.searchInput;
    }
    
    set input(newInput) {
        this.searchInput = newInput;
    }

}