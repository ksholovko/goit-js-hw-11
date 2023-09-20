
import SearchApiService from "./search-service";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const searchApiService = new SearchApiService;

let gallerybox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  
  searchApiService.input = event.currentTarget.elements.searchQuery.value;
  searchApiService.resetPage();
  const results = await searchApiService.fetchImages();
  clearGallery();
  createMarkup(results);
  gallerybox.refresh();

  loadMoreBtn.style.display = "block";

}

async function onLoadMore() {
  const results = await searchApiService.fetchImages();
  createMarkup(results);
  gallerybox.refresh();
  smoothScroll()
}

function createMarkup(response) {
      
    const responseArray = response.data.hits;
    
    let markupArray = [];

    responseArray.forEach(function callback(element) {

    const smallPicture = element.webformatURL;
    const largePicture = element.largeImageURL;
    const tags = element.tags;
    const likes = element.likes;
    const views = element.views;
    const comments = element.comments;
    const downloads = element.downloads;

    const card = `<div class="photo-card">
  <a href="${largePicture}" class="photo-link"><img src="${smallPicture}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
        
        markupArray.push(card);

});

    
  gallery.insertAdjacentHTML("beforeend", markupArray.join(" "));
  
}

function clearGallery() {
  gallery.innerHTML = "";
}

function smoothScroll() {
  
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}





//   

// __________________Other option______________________________

//     for (let i = 0; i < responseArray.length; i += 1) {
    
//     const smallPicture = responseArray[i].webformatURL;
//     const largePicture = responseArray[i].largeImageURL;
//     const tags = responseArray[i].tags;
//     const likes = responseArray[i].likes;
//     const views = responseArray[i].views;
//     const comments = responseArray[i].comments;
//     const downloads = responseArray[i].downloads;

//     const card = `<div class="photo-card">
//   <img src="${smallPicture}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div>`;

//     const gallery = document.querySelector('.gallery');
//     gallery.insertAdjacentHTML("beforeend", card);
// }

    
// }