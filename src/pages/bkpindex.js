// 90bad505-9b23-4e57-bd47-bbde1de5ca18
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
    authorization: "90bad505-9b23-4e57-bd47-bbde1de5ca18",
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

// Initialize UserInfo to manage and update profile data (name and description)
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Function to handle opening the delete confirmation popup
function handleDeleteCard(cardElement, cardId) {
  const deletePopup = document.querySelector("#delete-card-popup");
  const confirmDeleteButton = document.querySelector("#confirm-delete-button");

  // Open the delete confirmation popup
  deletePopup.classList.add("popup_opened");

  // When the user confirms the deletion
  confirmDeleteButton.addEventListener("click", () => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deletePopup.classList.remove("popup_opened");
        confirmDeleteButton.removeEventListener("click", deleteCard);
      })
      .catch((err) => console.error(`Error deleting card: ${err}`));
  });

  // Set up event listener to close the popup
  deletePopup.querySelector(".popup__close").addEventListener("click", () => {
    deletePopup.classList.remove("popup_opened");
  });
}

// Function to create a new card using the Card class
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePopup);
  return card.getView(); // Return the card element for rendering
}

// Initialize the Section class to render and manage the card list
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// API Calls - Fetch and render user info and cards
api
  .getUserInfo()
  .then((userInfo) => {
    userInfoInstance.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
    });
  })
  .catch((err) => console.error("Error fetching user info:", err));

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => console.error("Error fetching cards:", err));

// Function to open the profile edit popup with current user data
function handleProfileEdit() {
  const userData = userInfoInstance.getUserInfo(); // Get current profile data (name, description)
  profileTitleInput.value = userData.name; // Pre-fill the form with the current name
  profileDescriptionInput.value = userData.description; // Pre-fill the form with the current description

  profileFormValidator.resetValidation(); // Reset validation state for the form
  profileEditPopupInstance.open(); // Open the popup
}

// Function to open the image popup with the provided image link and name
function handleImagePopup(link, name) {
  picturePopupInstance.open({ name, link }); // Pass the image data to the popup instance
}

// Initialize the profile edit popup with form handling
const profileEditPopupInstance = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    const saveButton = document.querySelector(
      "#profile-edit-popup .popup__button"
    );
    saveButton.textContent = "Saving...";

    api
      .updateUserInfo(formData) // API call to update user info
      .then((updatedUserInfo) => {
        userInfoInstance.setUserInfo({
          name: updatedUserInfo.name,
          description: updatedUserInfo.about,
        });
        profileEditPopupInstance.close(); // Close the popup after submission
      })
      .catch((err) => console.error("Error updating profile:", err))
      .finally(() => {
        saveButton.textContent = "Save"; //Revert back to save
      });
  }
);
profileEditPopupInstance.setEventListeners(); // Set up event listeners for the popup

// Initialize the add card popup with form handling
const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (formData) => {
    const saveButton = document.querySelector("#add-card-popup .popup__button");
    saveButton.textContent = "Saving...";

    api
      .addCard(formData) // API call to add a new card
      .then((newCard) => {
        const cardElement = createCard(newCard); // Create the new card
        cardSection.addItem(cardElement); // Add it to the section
        addCardPopupInstance.close(); // Close the popup after submission
      })
      .catch((err) => console.error("Error adding card:", err))
      .finally(() => {
        saveButton.textContent = "Save";
      });
  }
);
addCardPopupInstance.setEventListeners(); // Set up event listeners for the popup

// Initialize the avatar edit popup with form handling
const avatarEditButton = document.querySelector("#edit-avatar-button");
const avatarEditPopup = new PopupWithForm("#avatar-edit-popup", (formData) => {
  const saveButton = document.querySelector(
    "#avatar-edit-popup .popup__button"
  );
  saveButton.textContent = "Saving...";

  api
    .updateAvatar(formData.avatar) // API call to update the avatar
    .then((updatedUserInfo) => {
      // Update the avatar in the DOM
      document.querySelector(".profile__image").src = updatedUserInfo.avatar;
      avatarEditPopup.close(); // Close the popup after submission
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => {
      saveButton.textContent = "Save";
    });
});

// Set up the event listener for the avatar edit button
avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open(); // Open the popup to edit avatar
});
avatarEditPopup.setEventListeners(); // Set up event listeners for the avatar popup

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

// Set up event listeners for the profile edit and add card buttons
profileEditButton.addEventListener("click", handleProfileEdit);
addCardButton.addEventListener("click", () => {
  addCardPopupInstance.open(); // Open the add card popup when the button is clicked
});
