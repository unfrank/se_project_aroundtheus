EVERYTHING INTACT

index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Around the U.S</title>
  </head>
  <body class="page">
    <div class="page__content">
      <header class="header page__section">
        <img
          src="<%=require('./images/logo.svg')%>"
          alt="Logo"
          class="header__logo"
        />
      </header>
      <main class="content">
        <section class="profile page__section">
          <img
            src="<%=require('./images/jacques-cousteau.jpg')%>"
            alt="Portrait of Jacques"
            class="profile__image"
          />

          <div class="profile__info">
            <h1 class="profile__title">Jacques Cousteau</h1>
            <button
              class="profile__edit-button"
              id="profile-edit-button"
              type="button"
            ></button>
            <p class="profile__description">Explorer</p>
          </div>
          <button
            class="profile__add-button"
            id="profile-add-button"
            type="button"
          ></button>
        </section>
        <section class="cards page__section">
          <ul class="cards__list"></ul>
        </section>
      </main>
      <footer class="footer">
        <p class="footer__text">© 2024 Around The U.S.</p>
      </footer>
    </div>

    <!-- Edit popup -->
    <div class="popup" id="profile-edit-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <h2 class="popup__heading">Edit Profile</h2>
        <form class="popup__form" id="edit-profile-form" name="profile-form">
          <input
            class="popup__input popup__input_type_name"
            id="profile-title-input"
            type="text"
            minlength="2"
            maxlength="40"
            required
            name="name"
            placeholder="Name"
            autocomplete="off"
          />
          <span class="popup__error" id="profile-title-input-error"></span>
          <input
            class="popup__input popup__input_type_description"
            id="profile-description-input"
            type="text"
            minlength="2"
            maxlength="200"
            required
            name="description"
            placeholder="Description"
            autocomplete="off"
          />
          <span
            class="popup__error"
            id="profile-description-input-error"
          ></span>
          <button class="popup__button popup__button_disabled" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>

    <!-- Add Card popup -->
    <div class="popup" id="add-card-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <h2 class="popup__heading">New Place</h2>
        <form class="popup__form" id="add-card-form" name="card-form">
          <input
            class="popup__input popup__input_type_title"
            id="add-card-title"
            type="text"
            minlength="1"
            maxlength="30"
            required
            name="title"
            placeholder="Title"
            autocomplete="off"
          />
          <span class="popup__error" id="add-card-title-error"></span>
          <input
            class="popup__input popup__input_type_url"
            id="add-card-url"
            type="url"
            required
            name="url"
            placeholder="Image URL"
            autocomplete="off"
          />
          <span class="popup__error" id="add-card-url-error"></span>
          <button class="popup__button popup__button_disabled" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>

    <!-- Picture popup -->
    <div class="popup" id="picture-popup">
      <div class="popup__container popup__container_large">
        <button class="popup__close" type="button"></button>
        <img class="popup__image" />
        <div class="popup__caption"></div>
      </div>
    </div>

    <template id="card-template">
      <li class="card">
        <div class="card__image-container">
          <img class="card__image" />
          <button class="card__trash-button" type="button"></button>
        </div>
        <div class="card__description">
          <h3 class="card__title"></h3>
          <button class="card__like-button" type="button"></button>
        </div>
      </li>
    </template>
  </body>
</html>
constants.js:
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

constants.js
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
};
index.js:
import {
  formValidationSettings,
  initialCards,
  selectors,
} from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./scripts/Popup.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";

import "./pages/index.css";

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
popup.js:
export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    // Check if the popup element exists, throw an error if not
    if (!this._popupElement) {
      throw new Error(`Popup element with selector ${popupSelector} not found`);
    }

    this._closeButton = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  // Opens the popup
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Closes the popup
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Private method to handle "Esc" key press to close popup
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Private method to handle overlay click to close popup
  _handleOverlayClick(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  // Sets event listeners for closing popup
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
  }
}
popupwithform.js:
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // Pass the popupSelector to the parent Popup constructor
    super({ popupSelector });

    // Select the form inside the popup
    this._popupForm = this._popupElement.querySelector(".popup__form");

    // Store the form submission callback
    this._handleFormSubmit = handleFormSubmit;

    // Select all input fields within the form
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  // Private method to collect input values from the form
  _getInputValues() {
    const formValues = {};

    // Iterate over all inputs and store their values in an object
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  // Override setEventListeners to include form submission
  setEventListeners() {
    // Call the parent setEventListeners method to handle popup closing
    super.setEventListeners();

    // Add a submit event listener to the form
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Collect the input values and pass them to the form submission handler
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  // Override close method to reset the form and close the popup
  close() {
    this._popupForm.reset(); // Reset the form fields
    super.close(); // Call the parent class's close method
  }
}

export default PopupWithForm;
popupwithimage.js:
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // Make sure to pass popupSelector correctly to the parent constructor
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  // Override the open() method to set image and caption
  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}
section.js:
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renders all items by calling the renderer function on each item
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adds a DOM element to the container
  addItem(element) {
    this._container.append(element);
  }
}
card.js:
export default class Card {
  // Initializes the card with the given data and handles interactions
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Method to create the card element by cloning the template and populating it with data
  _createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // Storing references to card elements
    this._cardElement = cardElement;
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    // Setting card content (image and title)
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    return this._cardElement;
  }

  // Method to set up event listeners for the card's interactive elements
  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const trashButton = this._cardElement.querySelector(".card__trash-button");

    // Toggle the "like" state when the like button is clicked
    likeButton.addEventListener("click", () =>
      likeButton.classList.toggle("card__like-button_active")
    );

    // Remove the card when the trash button is clicked
    trashButton.addEventListener("click", () => this._cardElement.remove());

    // Open the image in a popup when the image is clicked
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  // Public method to get the complete card element with event listeners attached
  getView() {
    this._createCardElement();
    this._setEventListeners();
    return this._cardElement;
  }
}
formvalidator.js:
export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    });
    this._toggleButtonState();
  }

  disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}


// 

