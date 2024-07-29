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
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");

const picturePopup = document.querySelector("#picture-popup");
const picturePopupContainer = picturePopup.querySelector(
  ".popup__container_large"
);
const picturePopupImage = picturePopup.querySelector(".popup__image");

const profileEditCloseButton = profileEditPopup.querySelector(".popup__close");
const addCardCloseButton = addCardPopup.querySelector(".popup__close");
const picturePopupCloseButton = picturePopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardForm = document.forms["card-form"];
const addCardTitleInput = document.querySelector("#add-card-title");
const addCardUrlInput = document.querySelector("#add-card-url");

const closeButtons = document.querySelectorAll(".popup__close");

// popup Functions
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", handleOverlayClick);
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

// Event Handlers
const handleProfileEditSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
  profileEditForm.reset();
};

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const url = addCardUrlInput.value;
  const cardData = { name: title, link: url };
  renderCard(cardData, "prepend");
  closePopup(addCardPopup);
  addCardForm.reset();
};

const handleProfileEditButtonClick = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
};

const handleAddCardButtonClick = () => openPopup(addCardPopup);
const handleProfileEditCloseButtonClick = () => closePopup(profileEditPopup);
const handleAddCardCloseButtonClick = () => closePopup(addCardPopup);
const handlePicturePopupCloseButtonClick = () => closePopup(picturePopup);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Open and Close popups
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);
profileEditCloseButton.addEventListener(
  "click",
  handleProfileEditCloseButtonClick
);
addCardCloseButton.addEventListener("click", handleAddCardCloseButtonClick);
picturePopupCloseButton.addEventListener(
  "click",
  handlePicturePopupCloseButtonClick
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Card Functions
const getCardEl = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () =>
    openPicturePopup(cardData.link, cardData.name)
  );
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  trashButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
};

const renderCard = (item, method = "prepend") => {
  const cardElement = getCardEl(item);
  cardListEl[method](cardElement);
};

const openPicturePopup = (imageSrc, imageTitle) => {
  picturePopupImage.src = imageSrc;
  picturePopupImage.alt = imageTitle;
  const captionElement = picturePopup.querySelector(".popup__caption");
  captionElement.textContent = imageTitle;

  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    picturePopupContainer.classList.remove("popup_landscape", "popup_portrait");
    if (img.width > img.height) {
      picturePopupContainer.classList.add("popup_landscape");
    } else {
      picturePopupContainer.classList.add("popup_portrait");
    }
    openPopup(picturePopup);
  };
};

// Initialize Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "prepend");
});
