// Imports modules and classes
import {
  formValidationSettings,
  initialCards,
  selectors,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// Destructured selectors from the constants file
const {
  profileEditForm,
  addCardForm,
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
  cardListEl,
} = selectors;

// Initialize UserInfo to manage and update profile data (name and description)
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Function to open the profile edit popup with current user data
function handleProfileEdit() {
  const userData = userInfo.getUserInfo(); // Get current profile data (name, description)
  profileTitleInput.value = userData.name; // Pre-fill the form with the current name
  profileDescriptionInput.value = userData.description; // Pre-fill the form with the current description

  profileFormValidator.resetValidation(); // Reset validation state for the form
  profileEditPopupInstance.open(); // Open the popup
}

// Function to open the image popup with the provided image link and name
function handleImagePopup(link, name) {
  picturePopupInstance.open({ name, link }); // Pass the image data to the popup instance
}

// Function to create a new card using the Card class
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePopup);
  return card.getView(); // Return the card element for rendering
}

// Initialize the Section class to render and manage the card list
const cardSection = new Section(
  {
    items: initialCards, // Array of initial cards to render
    renderer: (cardData) => {
      const cardElement = createCard(cardData); // Create the card and get the rendered card element
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Initialize the profile edit popup with form handling
const profileEditPopupInstance = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
    profileEditPopupInstance.close(); // Close the popup after submission
  }
);
profileEditPopupInstance.setEventListeners(); // Set up event listeners for the popup

// Initialize the add card popup with form handling
const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (formData) => {
    const cardElement = createCard({
      name: formData.title, // Title input from the form
      link: formData.url, // URL input from the form
    });
    cardFormValidator.disableButton();
    cardSection.addItem(cardElement); // Add the new card to the card section
    addCardPopupInstance.close(); // Close the popup after submission
  }
);
addCardPopupInstance.setEventListeners(); // Set up event listeners for the popup

// Initialize the image popup for displaying larger images
const picturePopupInstance = new PopupWithImage("#picture-popup");
picturePopupInstance.setEventListeners(); // Set up event listeners for the popup

// Initialize form validators for the profile and card forms
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

// Render the initial cards when the page loads
cardSection.renderItems(); // The Section class manages card insertion into the DOM

// Set up event listeners for the profile edit and add card buttons
profileEditButton.addEventListener("click", handleProfileEdit);
addCardButton.addEventListener("click", () => {
  addCardPopupInstance.open(); // Open the add card popup when the button is clicked
});
