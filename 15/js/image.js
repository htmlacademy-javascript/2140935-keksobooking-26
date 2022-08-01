import {adFormElement} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('#img-preview-avatar');
const fileChooserElement = document.querySelector('#images');
const previewElement = document.querySelector('#img-preview');

// Аватар фото
avatarFileChooserElement.addEventListener('change', () => {
  const file = avatarFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

// Фото объявления
fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
});

// сброс при reset
adFormElement.addEventListener('reset', () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  previewElement.src = 'img/muffin-grey.svg';
});
