
import SearchApiService from "./search-service";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';


const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const searchApiService = new SearchApiService;

let gallerybox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  try {
    
    event.preventDefault();
    
    console.log(searchApiService.input);
  searchApiService.input = event.currentTarget.elements.searchQuery.value.trim();
    console.log(searchApiService.input);
    
    if (event.currentTarget.elements.searchQuery.value.trim() === "") {
     return Notify.failure('Oops! Enter something!');
    }
    
  
  searchApiService.resetPage();
  
  const results = await searchApiService.fetchImages();
  
    if (searchApiService.totalHitsNumber === 0) {
      clearGallery();
      loadMoreBtn.style.display = "none";
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");  
  }

  Notify.success( `Hooray! We found ${searchApiService.totalHitsNumber} images.`);
  
  clearGallery();
  createMarkup(results);

  if (searchApiService.totalHitsNumber <= 40) {
   return loadMoreBtn.style.display = "none";
  }
  
  loadMoreBtn.style.display = "block";
    
  } catch (error) {
  
  Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay',
    );
    console.log(error);
  }
  
}

async function onLoadMore() {

  try {

  searchApiService.incrementPage();
  const results = await searchApiService.fetchImages();
  createMarkup(results);
  smoothScroll()
 
  if (Math.ceil(searchApiService.totalHitsNumber / 40) === searchApiService.page) {
    
  loadMoreBtn.style.display = "none";
  Notify.info("You've reached the end of search results.");
  
  }
    
  } catch (error) {
      Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Okay',
    );
    console.log(error);
  }
  
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
    <div class="image-container">
    <a href="${largePicture}" class="photo-link"><img src="${smallPicture}" alt="${tags}" loading="lazy" /></a>
    </div>
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
  gallerybox.refresh();
  
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

// _________GO TO TOP BUTTON__________

const goToTopBtn = document.querySelector(".go-to-top-btn");
goToTopBtn.addEventListener("click", topFunction)

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}



// window.addEventListener("scroll", () => {
//   if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) { 
//     console.log(window.scrollY);
//     console.log(window.innerHeight);
//     console.log(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight);
//   onLoadMore()
// }})