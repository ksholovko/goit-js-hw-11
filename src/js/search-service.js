import axios from "axios";

export default class SearchApiService {
    constructor() {
        this.searchInput = '';
        this.page = 1;   
        this.totalHitsNumber = null;
    }

    async fetchImages() {

        const KEY = "39538496-5692811f32f5eeb2890664c8c";
        const baseURL = `https://pixabay.com/api/?key=${KEY}&q=${this.searchInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const result = await axios.get(baseURL);
        this.page += 1;
        this.totalHitsNumber = result.data.totalHits;

        return result;
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