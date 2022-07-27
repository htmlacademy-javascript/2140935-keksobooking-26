const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Аватар
const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#img-preview-avatar');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

// Фотографии жилья (выводится одна в превью, а хотелось бы много)
const fileChooser = document.querySelector('#images');
const preview = document.querySelector('#img-preview');
//const adFormFoto = document.querySelector('ad-form__photo');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
