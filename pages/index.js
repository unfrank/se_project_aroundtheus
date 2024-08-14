import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Configuration object for form validation
const formValidationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

// Define initial cards
const initialCards = [
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
const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

// Create instances of FormValidator for each form
const profileFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);

// Enable validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");

const picturePopup = document.querySelector("#picture-popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardListEl = document.querySelector(".cards__list");

// Function to open a popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
};

// Function to close a popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
};

// Close popup on overlay click
const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

// Close popup on Esc key press
const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Open the profile edit popup with current profile data
const handleProfileEditButtonClick = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  openPopup(profileEditPopup);
};

// Handle profile form submission
const handleProfileEditSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileFormValidator.disableButtonAfterSubmit();
  closePopup(profileEditPopup);
};

// Handle adding a new card
const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const url = addCardUrlInput.value;
  const cardData = { name: title, link: url };
  const card = new Card(cardData, "#card-template", openPicturePopup);
  cardListEl.prepend(card.getView());
  cardFormValidator.disableButtonAfterSubmit();
  closePopup(addCardPopup);
  addCardForm.reset();
  cardFormValidator.resetValidation();
};

// Function to open the picture popup
const openPicturePopup = (imageSrc, imageTitle) => {
  const picturePopupImage = picturePopup.querySelector(".popup__image");
  const captionElement = picturePopup.querySelector(".popup__caption");

  picturePopupImage.src = imageSrc;
  picturePopupImage.alt = imageTitle;
  captionElement.textContent = imageTitle;

  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    const picturePopupContainer = picturePopup.querySelector(
      ".popup__container_large"
    );
    picturePopupContainer.classList.remove("popup_landscape", "popup_portrait");
    if (img.width > img.height) {
      picturePopupContainer.classList.add("popup_landscape");
    } else {
      picturePopupContainer.classList.add("popup_portrait");
    }
    openPopup(picturePopup);
  };
};

// Event Listeners
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
});
addCardForm.addEventListener("submit", handleAddCardSubmit);

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Initialize and render initial cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", openPicturePopup);
  cardListEl.prepend(card.getView());
});

// Handle overlay clicks for closing popups
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});
