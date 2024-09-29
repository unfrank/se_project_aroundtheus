export const formValidationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

// Element Selectors
export const selectors = {
  profileEditForm: document.forms["profile-form"],
  addCardForm: document.forms["card-form"],
  avatarEditForm: document.querySelector("#edit-avatar-form"),
  profileEditButton: document.querySelector("#profile-edit-button"),
  addCardButton: document.querySelector("#profile-add-button"),
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  profileTitleInput: document.querySelector("#profile-title-input"),
  profileDescriptionInput: document.querySelector("#profile-description-input"),
  cardListEl: document.querySelector(".cards__list"),
  addCardTitleInput: document.querySelector("#add-card-title"),
  addCardUrlInput: document.querySelector("#add-card-url"),
};
