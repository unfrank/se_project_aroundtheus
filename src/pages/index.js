// Imports modules and classes for API interactions, form validation, popup handling, and card rendering
import Api from "../components/Api.js";
import { formValidationSettings, selectors } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js"; // Import Popup for the delete confirmation popup
import "../pages/index.css"; // Import styles for the page

// Initialize the API instance with the base URL and headers (including authorization)
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "765a56ab-1403-4444-8fac-5fc1871e9695", // API token for authorization
    "Content-Type": "application/json",
  },
});

// Destructured selectors from the constants file for easy access to DOM elements
const {
  profileEditForm,
  addCardForm,
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
} = selectors;

// Cache DOM elements for buttons to avoid querying the DOM repeatedly
const saveProfileButton = document.querySelector(
  "#profile-edit-popup .popup__button"
);
const saveCardButton = document.querySelector("#add-card-popup .popup__button");
const saveAvatarButton = document.querySelector(
  "#avatar-edit-popup .popup__button"
);
const avatarEditButton = document.querySelector("#edit-avatar-button");

// Initialize UserInfo to manage and update profile data on the page
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title", // Selector for profile name
  descriptionSelector: ".profile__description", // Selector for profile description
  avatarSelector: ".profile__image", // Selector for profile avatar
});

// Initialize the delete confirmation popup using the Popup class
const deletePopupInstance = new Popup("#delete-card-popup");
deletePopupInstance.setEventListeners(); // Set up event listeners for escape key, close button, and background clicks

// Function to handle card deletion with confirmation popup
const handleDeleteCard = (cardElement, cardId) => {
  const confirmDeleteButton = document.querySelector("#confirm-delete-button");

  // Confirms card deletion by calling the API and removing the card element from the DOM
  const confirmDelete = () => {
    api
      .deleteCard(cardId) // API call to delete the card
      .then(() => {
        cardElement.remove(); // Remove card from UI upon successful deletion
        deletePopupInstance.close(); // Close the popup after deletion
      })
      .catch((err) => console.error(`Error deleting card: ${err}`)); // Handle any errors
  };

  // Add click listener for confirming deletion (once to avoid duplicate listeners)
  confirmDeleteButton.addEventListener("click", confirmDelete, { once: true });

  // Open the delete confirmation popup
  deletePopupInstance.open();

  // Close popup and remove event listener if "X" button is clicked or Escape key is pressed
  document.querySelector(".popup__close").addEventListener("click", () => {
    deletePopupInstance.close(); // Close the popup
    confirmDeleteButton.removeEventListener("click", confirmDelete); // Cleanup event listener
  });
};

// Function to create a new card using the Card class, passing in necessary handlers
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card-template", // Card template selector
    handleImagePopup, // Function to handle image click popup
    currentUserId, // Current user ID for managing card ownership
    api, // API instance for handling likes and deletion
    handleDeleteCard // Function to handle card deletion
  );
  return card.getView(); // Return the card element to render
};

// Initialize the Section class to render and manage the card list in the UI
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData); // Create a card element for each card
      cardSection.addItem(cardElement); // Add card to the card list (prepend it)
    },
  },
  ".cards__list" // Container where cards will be appended
);

// Fetch and render user info and cards after page load
let currentUserId; // Variable to store the current user's ID
api
  .getUserInfo()
  .then((userInfo) => {
    // Set user info on the page using the UserInfo instance
    userInfoInstance.setUserInfo({
      name: userInfo.name, // Set profile name
      description: userInfo.about, // Set profile description
      avatar: userInfo.avatar, // Set profile avatar
    });
    currentUserId = userInfo._id; // Store the current user ID

    return api.getInitialCards(); // Fetch initial cards from the server
  })
  .then((cards) => {
    // Render each card on the page
    cards.forEach((cardData) => {
      const cardElement = createCard({
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
        owner: cardData.owner,
        likes: cardData.likes,
      });
      cardSection.addItem(cardElement); // Add each card to the card section
    });
  })
  .catch((err) => console.error("Error fetching user info or cards:", err)); // Handle errors during API requests

// Opens profile edit popup and pre-fills the form with current user info
const handleProfileEdit = () => {
  const userData = userInfoInstance.getUserInfo(); // Get current profile data
  profileTitleInput.value = userData.name; // Pre-fill profile name input
  profileDescriptionInput.value = userData.description; // Pre-fill profile description
  profileFormValidator.resetValidation(); // Reset form validation state
  profileEditPopupInstance.open(); // Open the profile edit popup
};

// Opens the image popup when a card image is clicked
const handleImagePopup = (link, name) => {
  picturePopupInstance.open({ name, link }); // Open the popup with the image and its caption
};

// Initialize profile edit popup with form submission handling
const profileEditPopupInstance = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    saveProfileButton.textContent = "Saving..."; // Show loading state

    // Send PATCH request to update the user's profile info
    api
      .updateUserInfo({
        name: formData.name,
        about: formData.description,
      })
      .then((updatedUserInfo) => {
        userInfoInstance.setUserInfo({
          name: updatedUserInfo.name,
          description: updatedUserInfo.about,
          avatar: updatedUserInfo.avatar,
        });
        profileEditPopupInstance.close(); // Close the popup after success
      })
      .catch((err) => {
        console.error("Error updating profile:", err); // Handle errors during profile update
      })
      .finally(() => {
        saveProfileButton.textContent = "Save"; // Reset the button text after save
      });
  }
);

profileEditPopupInstance.setEventListeners(); // Set event listeners for the profile edit popup

// Initialize the card addition popup with form submission handling
const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (formData) => {
    saveCardButton.textContent = "Saving..."; // Show loading state

    // Send POST request to add a new card
    api
      .addCard({
        name: formData.title, // Card title
        link: formData.url, // Card image URL
      })
      .then((newCard) => {
        const cardElement = createCard({
          name: newCard.name,
          link: newCard.link,
          _id: newCard._id,
          owner: newCard.owner,
          likes: newCard.likes,
        });
        cardSection.addItem(cardElement); // Add new card to the UI
        addCardPopupInstance._formElement.reset(); // Reset form fields after submission
        addCardPopupInstance.close(); // Close the popup after success
        saveCardButton.textContent = "Save"; // Reset button text
      })
      .catch((err) => console.error("Error adding card:", err)); // Handle errors during card addition
  }
);

addCardPopupInstance.setEventListeners(); // Set event listeners for the card addition popup

// Initialize avatar edit popup with form submission handling
const avatarEditPopup = new PopupWithForm("#avatar-edit-popup", (formData) => {
  saveAvatarButton.textContent = "Saving..."; // Show loading state

  // Send PATCH request to update the user's avatar
  api
    .updateAvatar(formData.avatar)
    .then((updatedUserInfo) => {
      document.querySelector(".profile__image").src = updatedUserInfo.avatar; // Update avatar in the UI
      avatarEditPopup.close(); // Close the popup after success
    })
    .catch((err) => console.error("Error updating avatar:", err)) // Handle errors during avatar update
    .finally(() => {
      saveAvatarButton.textContent = "Save"; // Reset button text
    });
});

avatarEditPopup.setEventListeners(); // Set event listeners for the avatar edit popup

// Set up the event listener for the avatar edit button
avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open(); // Open the avatar edit popup when the button is clicked
});

// Initialize image popup for displaying larger images
const picturePopupInstance = new PopupWithImage("#picture-popup");
picturePopupInstance.setEventListeners(); // Set event listeners for the image popup

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
profileEditButton.addEventListener("click", handleProfileEdit); // Open profile edit popup
addCardButton.addEventListener("click", () => {
  addCardPopupInstance.open(); // Open card addition popup
});
