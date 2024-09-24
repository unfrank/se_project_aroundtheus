11.57am

// index.html:
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Around the U.S</title>
  </head>
  <body class="page">
    <div class="page__content">
      <!-- Header section with logo -->
      <header class="header page__section">
        <img
          src="<%=require('./images/logo.svg')%>"
          alt="Logo"
          class="header__logo"
        />
      </header>

      <!-- Main content section -->
      <main class="content">
        <!-- Profile section with profile image, name, edit button, and add button -->
        <section class="profile page__section">
          <div class="profile__image-container">
            <img
              src="<%=require('./images/jacques-cousteau.jpg')%>"
              alt="Portrait of Jacques"
              class="profile__image"
            />
            <!-- Edit icon for profile picture -->
            <button
              class="profile__edit-avatar-button"
              id="edit-avatar-button"
            ></button>
          </div>
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

        <!-- Section to display cards -->
        <section class="cards page__section">
          <ul class="cards__list"></ul>
          <!-- List of cards will be injected here -->
        </section>
      </main>

      <!-- Footer section -->
      <footer class="footer">
        <p class="footer__text">© 2024 Around The U.S.</p>
      </footer>
    </div>

    <!-- Popup for editing profile -->
    <div class="popup" id="profile-edit-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <!-- Close popup button -->
        <h2 class="popup__heading">Edit Profile</h2>
        <form class="popup__form" id="edit-profile-form" name="profile-form">
          <!-- Input for editing profile name -->
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
          <!-- Error message for name input -->

          <!-- Input for editing profile description -->
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
          <!-- Error message for description input -->

          <button class="popup__button popup__button_disabled" type="submit">
            Save
            <!-- Save button for the form -->
          </button>
        </form>
      </div>
    </div>

    <!-- Popup for adding a new card -->
    <div class="popup" id="add-card-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <!-- Close popup button -->
        <h2 class="popup__heading">New Place</h2>
        <form class="popup__form" id="add-card-form" name="card-form">
          <!-- Input for the new card title -->
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
          <!-- Error message for title input -->

          <!-- Input for the new card image URL -->
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
          <!-- Error message for URL input -->

          <button class="popup__button popup__button_disabled" type="submit">
            Save
            <!-- Save button for the form -->
          </button>
        </form>
      </div>
    </div>

    <!-- Popup for displaying an image -->
    <div class="popup" id="picture-popup">
      <div class="popup__container popup__container_large">
        <button class="popup__close" type="button"></button>
        <!-- Close popup button -->
        <img class="popup__image" />
        <!-- Full-size image displayed in the popup -->
        <div class="popup__caption"></div>
        <!-- Caption for the image -->
      </div>
    </div>

    <!-- Popup for confirming card deletion -->
    <div class="popup" id="delete-card-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <h2 class="popup__heading">Edit Profile</h2>
        <button class="popup__button" id="confirm-delete-button" type="button">
          Yes
        </button>
      </div>
    </div>

    <!-- Popup for editing avatar -->
    <div class="popup" id="avatar-edit-popup">
      <div class="popup__container">
        <button class="popup__close" type="button"></button>
        <h2 class="popup__heading">Change Avatar</h2>
        <form class="popup__form" id="edit-avatar-form" name="avatar-form">
          <input
            class="popup__input popup__input_type_avatar"
            id="avatar-url-input"
            type="url"
            required
            name="avatar"
            placeholder="Avatar URL"
            autocomplete="off"
          />
          <span class="popup__error" id="avatar-url-input-error"></span>
          <button class="popup__button" type="submit">Save</button>
        </form>
      </div>
    </div>

    <!-- Template for card structure -->
    <template id="card-template">
      <li class="card">
        <div class="card__image-container">
          <img class="card__image" />
          <!-- Image for the card -->
          <button class="card__trash-button" type="button"></button>
          <!-- Delete button for the card -->
        </div>
        <div class="card__description">
          <h3 class="card__title"></h3>
          <!-- Card title -->
          <button class="card__like-button" type="button"></button>
          <!-- Like button for the card -->
        </div>
      </li>
    </template>
  </body>
</html>
// 765a56ab-1403-4444-8fac-5fc1871e9695
// Imports modules and classes
import Api from "../components/Api.js";
import { formValidationSettings, selectors } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// Initialize the API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "765a56ab-1403-4444-8fac-5fc1871e9695",
    "Content-Type": "application/json",
  },
});

// Destructured selectors from the constants file
const {
  profileEditForm,
  addCardForm,
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
} = selectors;

// Cache DOM elements for buttons to avoid querying repeatedly
const saveProfileButton = document.querySelector(
  "#profile-edit-popup .popup__button"
);
const saveCardButton = document.querySelector("#add-card-popup .popup__button");
const saveAvatarButton = document.querySelector(
  "#avatar-edit-popup .popup__button"
);
const avatarEditButton = document.querySelector("#edit-avatar-button");

// Initialize UserInfo to manage and update profile data
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Function to handle card deletion
function handleDeleteCard(cardElement, cardId) {
  const deletePopup = document.querySelector("#delete-card-popup");
  const confirmDeleteButton = document.querySelector("#confirm-delete-button");

  deletePopup.classList.add("popup_opened");

  confirmDeleteButton.addEventListener(
    "click",
    () => {
      api
        .deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          deletePopup.classList.remove("popup_opened");
        })
        .catch((err) => console.error(`Error deleting card: ${err}`));
    },
    { once: true }
  );

  deletePopup.querySelector(".popup__close").addEventListener("click", () => {
    deletePopup.classList.remove("popup_opened");
  });
}

// Function to create a new card using the Card class
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImagePopup,
    currentUserId,
    api,
    handleDeleteCard
  );
  return card.getView();
}

// Initialize the Section class to render and manage the card list
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      console.log(cardElement); // Log the card element to check if it's being created correctly
      cardSection.addItem(cardElement); // Then add the card to the section
    },
  },
  ".cards__list"
);

// Fetch and render user info and cards
let currentUserId;
api
  .getUserInfo()
  .then((userInfo) => {
    console.log("User info fetched from server:", userInfo); // This will log the user object

    userInfoInstance.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar, // Avatar is now fetched and updated
    });
    currentUserId = userInfo._id;

    console.log("Fetching cards...");
    return api.getInitialCards();
  })
  .then((cards) => {
    console.log(cards);
    console.log(cards); // Check if cards are fetched

    cards.forEach((cardData) => {
      const cardElement = createCard({
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
        owner: cardData.owner,
        likes: cardData.likes,
      });
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => console.error("Error fetching user info or cards:", err));

// Open the profile edit popup with current user data
function handleProfileEdit() {
  const userData = userInfoInstance.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileFormValidator.resetValidation();
  profileEditPopupInstance.open();
}

// Open the image popup with provided image link and name
function handleImagePopup(link, name) {
  picturePopupInstance.open({ name, link });
}

// Initialize profile edit popup with form handling
const profileEditPopupInstance = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    // Change the button text to indicate saving process
    saveProfileButton.textContent = "Saving...";

    // Send PATCH request to update the user's info
    api
      .updateUserInfo({
        name: formData.name,
        about: formData.description,
      })
      .then((updatedUserInfo) => {
        // Update the user info on the page
        userInfoInstance.setUserInfo({
          name: updatedUserInfo.name,
          description: updatedUserInfo.about,
          avatar: updatedUserInfo.avatar,
        });
        profileEditPopupInstance.close(); // Close the popup after success
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        // Reset the button text back to "Save"
        saveProfileButton.textContent = "Save";
      });
  }
);

profileEditPopupInstance.setEventListeners();

// Initialize add card popup with form handling
const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (formData) => {
    saveCardButton.textContent = "Saving...";
    api
      .addCard(formData)
      .then((newCard) => {
        const cardElement = createCard({
          name: newCard.name,
          link: newCard.link,
          _id: newCard._id,
          owner: newCard.owner,
          likes: newCard.likes,
        });
        cardSection.addItem(cardElement);
        addCardPopupInstance.close();
      })
      .catch((err) => console.error("Error adding card:", err))
      .finally(() => {
        saveCardButton.textContent = "Save";
        console.log("Add card form submitted:", formData);
      });
  }
);
addCardPopupInstance.setEventListeners();

// Initialize avatar edit popup with form handling
const avatarEditPopup = new PopupWithForm("#avatar-edit-popup", (formData) => {
  saveAvatarButton.textContent = "Saving...";
  api
    .updateAvatar(formData.avatar)
    .then((updatedUserInfo) => {
      document.querySelector(".profile__image").src = updatedUserInfo.avatar;
      avatarEditPopup.close();
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => {
      saveAvatarButton.textContent = "Save";
    });
});
avatarEditPopup.setEventListeners();

// Set up the event listener for the avatar edit button
avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
});

// Initialize image popup for displaying larger images
const picturePopupInstance = new PopupWithImage("#picture-popup");
picturePopupInstance.setEventListeners();

// Initialize form validators for profile and card forms
const profileFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);

// Enable form validation for both forms
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Set up event listeners for profile edit and add card buttons
profileEditButton.addEventListener("click", handleProfileEdit);
addCardButton.addEventListener("click", () => {
  addCardPopupInstance.open();
});

// api.js:
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _handleError(err) {
    console.error(err);
    return Promise.reject(err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("API error:", err); // Catch API errors
        return Promise.reject(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }
}
// card.js:
export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    cardSelector,
    handleImageClick,
    currentUserId,
    api,
    handleDeleteCard // Added handleDeleteCard to constructor
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes; // List of users who liked the card
    this._owner = owner; // Owner ID of the card
    this._currentUserId = currentUserId; // The current logged-in user's ID
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api; // Reference to the API class instance
    this._handleDeleteCard = handleDeleteCard; // Reference to handleDeleteCard function
  }

  _createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardElement;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeCountEl = this._cardElement.querySelector(".card__like-count");

    // Set the card data
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    // Hide the trash button if the current user is not the card owner
    if (this._owner !== this._currentUserId) {
      this._trashButton.style.display = "none";
    }

    // Set the initial like state and count
    this._setLikeState();

    return this._cardElement;
  }

  // Check if the card is liked by the current user and update the heart icon
  _setLikeState() {
    if (Array.isArray(this._likes)) {
      const userLiked = this._likes.some(
        (user) => user._id === this._currentUserId
      );
      if (userLiked) {
        this._likeButton.classList.add("card__like-button_active");
        this._isLiked = true;
      } else {
        this._likeButton.classList.remove("card__like-button_active");
        this._isLiked = false;
      }
      this._likeCountEl.textContent = this._likes.length;
    } else {
      // If `likes` is undefined, handle it as an empty array
      this._likeCountEl.textContent = 0;
      this._likes = []; // Default to an empty array if undefined
      console.error("Likes data is not an array:", this._likes);
    }
  }

  // Toggle like/unlike card
  _toggleLike() {
    if (this._isLiked) {
      this._api
        .dislikeCard(this._id) // Unlike the card
        .then((updatedCard) => {
          this._likes = updatedCard.likes; // Update the likes array
          this._setLikeState(); // Update UI based on the new like status
        })
        .catch((err) => console.error(`Error unliking card: ${err}`));
    } else {
      this._api
        .likeCard(this._id) // Like the card
        .then((updatedCard) => {
          this._likes = updatedCard.likes; // Update the likes array
          this._setLikeState(); // Update UI based on the new like status
        })
        .catch((err) => console.error(`Error liking card: ${err}`));
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike(); // Toggle like/unlike on click
    });

    // Show delete confirmation if the current user owns the card
    if (this._owner === this._currentUserId) {
      this._trashButton.addEventListener(
        "click",
        () => this._handleDeleteCard(this._cardElement, this._id) // Use this._handleDeleteCard
      );
    }

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  getView() {
    this._createCardElement();
    this._setEventListeners();
    return this._cardElement;
  }
}

// formvalidator.js:
export default class FormValidator {
  // Constructor initializes the class with validation settings and the form element to be validated
  constructor(settings, formElement) {
    this._settings = settings; // Object containing validation settings (selectors, classes)
    this._formElement = formElement; // The form element that will be validated

    // Create an array of all input elements inside the form
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    // Select the submit button inside the form
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Private method to check if any input field is invalid
  _hasInvalidInput() {
    // Use the 'some' array method to check if any input field is invalid
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method to enable or disable the submit button based on form validity
  _toggleButtonState() {
    // If any input is invalid, disable the submit button, otherwise enable it
    if (this._hasInvalidInput()) {
      this.disableButton(); // Disable the button if there is an invalid input
    } else {
      // Enable the button by removing the inactive class and setting the disabled property to false
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Private method to check the validity of a specific input element and show/hide error messages
  _checkInputValidity(inputElement) {
    // Select the error message element associated with the input field
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    // If the input is invalid, show the error message and apply the error class
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._settings.inputErrorClass); // Add error class to the input
      errorElement.textContent = inputElement.validationMessage; // Display the validation error message
    } else {
      // If the input is valid, remove the error class and clear the error message
      inputElement.classList.remove(this._settings.inputErrorClass); // Remove error class
      errorElement.textContent = ""; // Clear the error message
    }
  }

  // Private method to set up event listeners for input fields
  _setEventListeners() {
    // Initially check the button state to make sure it reflects the form's current state
    this._toggleButtonState();

    // Add an 'input' event listener to each input field to validate the input in real-time
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Check the validity of the input field
        this._toggleButtonState(); // Update the button state based on the current input validity
      });
    });
  }

  // Public method to enable form validation by setting event listeners
  enableValidation() {
    this._setEventListeners(); // Set up event listeners for input fields and form validation
  }

  // Public method to reset form validation (clear errors and reset button state)
  resetValidation() {
    // Clear validation errors for all inputs
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settings.inputErrorClass); // Remove error class
      errorElement.textContent = ""; // Clear the error message
    });

    // Reset the submit button's state
    this._toggleButtonState(); // Ensure the button reflects the current form validity
  }

  // Public method to disable the submit button
  disableButton() {
    // Add the inactive class and set the disabled property to true
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
// popup.js:
// popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector); // This must be valid!
    this._handleEscClose = this._handleEscClose.bind(this); // Bind context for esc close
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
// popupwithform.js:
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Call the constructor of the parent class (Popup)
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  _getInputValues() {
    const inputValues = {}; // Initialize an empty object to hold form data
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues; // Return the object containing all input values
  }

  setEventListeners() {
    super.setEventListeners(); // Call the parent class method to handle popup listeners
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission behavior
      this._handleFormSubmit(this._getInputValues()); // Call the form submit handler function
      this._formElement.reset(); // Reset the form after submission
    });
  }
}
// popupwithimage.js:
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  open({ name, link }) {
    this._imageElement.src = link; // Set the image URL
    this._imageElement.alt = name; // Set the image alt text
    this._captionElement.textContent = name; // Set the caption text
    super.open(); // Open the popup
  }
}
// section.js:
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Render each item and add it to the container via the renderer
    });
  }

  addItem(renderedItem) {
    this._container.prepend(renderedItem); // Add the rendered item to the top of the container
  }
}
// userinfo.js:
export default class UserInfo {
  // Constructor initializes the class with the selectors for name, description, and avatar elements
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector); // Avatar selector
  }

  // Method to get the current user information (name, description, avatar) from the DOM
  getUserInfo() {
    return {
      name: this._nameElement.textContent, // Get the name from the DOM element
      description: this._descriptionElement.textContent, // Get the description
      avatar: this._avatarElement.src, // Get the avatar URL
    };
  }

  // Method to update the user's information in the DOM (name, description, avatar)
  setUserInfo({ name, description, avatar }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;

    // If avatar is provided, update the avatar in the DOM
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
