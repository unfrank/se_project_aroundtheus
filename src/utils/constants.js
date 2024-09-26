// Form Validation Settings
export const formValidationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

// Initial Cards
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Element Selectors
export const selectors = {
  profileEditForm: document.forms["profile-form"],
  addCardForm: document.forms["card-form"],
  profileEditButton: document.querySelector("#profile-edit-button"),
  addCardButton: document.querySelector("#profile-add-button"),
  profileEditPopup: document.querySelector("#profile-edit-popup"),
  addCardPopup: document.querySelector("#add-card-popup"),
  picturePopup: document.querySelector("#picture-popup"),
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  profileTitleInput: document.querySelector("#profile-title-input"),
  profileDescriptionInput: document.querySelector("#profile-description-input"),
  cardListEl: document.querySelector(".cards__list"),
  addCardTitleInput: document.querySelector("#add-card-title"),
  addCardUrlInput: document.querySelector("#add-card-url"),
  avatarEditForm: document.querySelector("#edit-avatar-form"),
};
