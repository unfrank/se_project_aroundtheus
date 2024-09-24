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
    console.log(formData); // Add this to inspect formData structure

    saveCardButton.textContent = "Saving...";
    api

      .addCard({
        name: formData.title,
        link: formData.url,
      })
      .then((newCard) => {
        const cardElement = createCard({
          name: newCard.name,
          link: newCard.link,
          _id: newCard._id,
          owner: newCard.owner,
          likes: newCard.likes,
        });
        cardSection.addItem(cardElement);
        addCardPopupInstance._formElement.reset();
        addCardPopupInstance.close();
        saveCardButton.textContent = "Save";
      })
      .catch((err) => console.error("Error adding card:", err));
    console
      .error("Error adding card:", err) // Log the error

      .finally(() => {
        // saveCardButton.textContent = "Save";
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
