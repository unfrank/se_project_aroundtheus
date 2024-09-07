import {
  formValidationSettings,
  initialCards,
  selectors,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";

// Destructured selectors
const {
  profileEditForm,
  addCardForm,
  profileEditButton,
  addCardButton,
  profileEditPopup,
  addCardPopup,
  picturePopup,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
  addCardTitleInput,
  addCardUrlInput,
} = selectors;

// Function to create a card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", openPicturePopup);
  return card.getView();
}

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
  profileFormValidator.disableButton();
  closePopup(profileEditPopup);
};

// Handle adding a new card
const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const url = addCardUrlInput.value;
  const cardElement = createCard({ name: title, link: url });
  cardListEl.prepend(cardElement);
  cardFormValidator.disableButton();
  closePopup(addCardPopup);
  addCardForm.reset();
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

// Initialize and render initial cards
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.prepend(card);
});

// Event Listeners
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Handle overlay clicks for closing popups
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

// eliminate scripts folder and assimilate
// clean up comments
