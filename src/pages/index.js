// Imports
import Api from "../components/Api.js";
import { formValidationSettings, selectors } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

// Destructured selectors from utils
const {
  addCardForm,
  addCardButton,
  avatarEditForm,
  profileEditForm,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
} = selectors;

// Cache DOM element for the avatar edit button to avoid querying the DOM repeatedly
const avatarEditButton = document.querySelector("#edit-avatar-button");

// Initialize UserInfo to manage and update profile data on the page
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Initialize the delete confirmation popup only once
const deletePopupInstance = new PopupWithConfirmation("#delete-card-popup");
deletePopupInstance.setEventListeners();

// Function to handle card deletion with confirmation popup
const handleDeleteCard = (cardElement, cardId) => {
  deletePopupInstance.setConfirmHandler(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deletePopupInstance.close();
      })
      .catch((err) => console.error(`Error deleting card: ${err}`));
  });
  deletePopupInstance.open();
};

// Function to create a card
const createCard = (cardData) => {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      _id: cardData._id,
      owner: cardData.owner,
      isLiked: cardData.isLiked,
    },
    "#card-template",
    handleImagePopup,
    currentUserId,
    api,
    handleDeleteCard
  );
  return card.getView();
};

// Initialize the Section class to render and manage the card list in the UI
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Fetch and render user info and cards after page load
let currentUserId; // Variable to store the current user's ID
api
  .getUserInfo()
  .then((userInfo) => {
    userInfoInstance.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar,
    });
    currentUserId = userInfo._id;

    return api.getInitialCards();
  })
  .then((cards) => {
    cardSection.renderItems(cards.reverse());
  })

  .catch((err) => console.error("Error fetching user info or cards:", err));

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
  picturePopupInstance.open({ name, link });
};

// Initialize profile edit popup with form submission handling
const profileEditPopupInstance = new PopupWithForm(
  "#profile-edit-popup",
  (formData) => {
    profileEditPopupInstance.renderLoading(true);

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
        profileEditPopupInstance.close();
        profileEditPopupInstance.resetForm();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        profileEditPopupInstance.renderLoading(false);
      });
  }
);

profileEditPopupInstance.setEventListeners();

// Initialize the card addition popup with form submission handling
const addCardPopupInstance = new PopupWithForm(
  "#add-card-popup",
  (formData) => {
    addCardPopupInstance.renderLoading(true);
    // Send POST request to add a new card
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
        addCardPopupInstance.close();
        addCardPopupInstance.resetForm();
        cardFormValidator.disableButton();
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      })
      .finally(() => {
        addCardPopupInstance.renderLoading(false);
      });
  }
);

addCardPopupInstance.setEventListeners(); // Set event listeners for the card addition popup

// Initialize avatar edit popup with form submission handling
const avatarEditPopup = new PopupWithForm("#avatar-edit-popup", (formData) => {
  avatarEditPopup.renderLoading(true);

  api
    .updateAvatar(formData.avatar)
    .then((updatedUserInfo) => {
      userInfoInstance.setUserInfo({
        name: updatedUserInfo.name,
        description: updatedUserInfo.about,
        avatar: updatedUserInfo.avatar,
      });
      avatarEditPopup.close();
      avatarEditForm.reset();
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
});

avatarEditPopup.setEventListeners();

// Set up the event listener for the avatar edit button
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

// Initialize image popup for displaying larger images
const picturePopupInstance = new PopupWithImage("#picture-popup");
picturePopupInstance.setEventListeners();

// Initialize form validators for profile, card, and avatar forms
const profileFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);
const avatarFormValidator = new FormValidator(
  formValidationSettings,
  avatarEditForm
);

// Enable form validation for all forms
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Set up event listeners for profile edit and add card buttons
profileEditButton.addEventListener("click", handleProfileEdit);
addCardButton.addEventListener("click", () => {
  addCardPopupInstance.open();
});
