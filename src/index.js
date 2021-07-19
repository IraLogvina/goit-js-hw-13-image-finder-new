
import './sass/main.scss';

import PhotoApi from './js/API';
import imageTpl from './template/photo-card.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import LoadMoreBtn from './js/loadBtn';

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const PhotoApiSearch = new PhotoApi();
const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryListRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  PhotoApiSearch.query = e.currentTarget.elements.query.value;
  const searchPhotoTrim = PhotoApiSearch.query.trim();

  if (searchPhotoTrim === '') {
    loadMoreBtn.disable();
      return noRequest();
  }

  loadMoreBtn.show();
  PhotoApiSearch.resetPage();
  refs.galleryListRef.innerHTML = '';
  fetchImages(); 
}

function fetchImages() {
  loadMoreBtn.disable();
  PhotoApiSearch.fetchPhoto().then(hits => {
    PhotoMarkup(hits);
      loadMoreBtn.enable();
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });

      if(hits.length === 0) {
        loadMoreBtn.hide();
          onError();
      }
  });
}


function PhotoMarkup(hits) {
  refs.galleryListRef.insertAdjacentHTML('beforeend', imageTpl(hits));
}

document.body.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') return;

  const instance = basicLightbox.create(
    `<img class="img-lightbox" src="${event.target.dataset.source}" />`,
  );
  instance.show();
});

function onError() {
  error({
      text: 'There is no such word, try again!',
      delay: 2000,
  });
}

function noRequest() {
  error({
      text: 'Please write a search word..',
      delay: 2000,
  });
}

