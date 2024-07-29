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

const profileEditpopup = document.querySelector("#profile-edit-popup");
const addCardpopup = document.querySelector("#add-card-popup");

const picturepopup = document.querySelector("#picture-popup");
const picturepopupContainer = picturepopup.querySelector(
  ".popup__container_large"
);
const picturepopupImage = picturepopup.querySelector(".popup__image");

const profileEditCloseButton = profileEditpopup.querySelector(".popup__close");
const addCardCloseButton = addCardpopup.querySelector(".popup__close");
const picturepopupCloseButton = picturepopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditpopup.querySelector(".popup__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardForm = document.querySelector("#add-card-form");
const addCardTitleInput = document.querySelector("#add-card-title");
const addCardUrlInput = document.querySelector("#add-card-url");

// popup Functions
const openpopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
};

const closepopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
};

// Close popup on overlay click
const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup")) {
    closepopup(event.target);
  }
};

// Close popup on Esc key press
const handleEscClose = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closepopup(openedPopup);
    }
  }
};

// Event Handlers
const handleProfileEditSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closepopup(profileEditpopup);
  profileEditForm.reset();
};

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const url = addCardUrlInput.value;
  const cardData = { name: title, link: url };
  const cardElement = getCardEl(cardData);
  cardListEl.prepend(cardElement);
  closepopup(addCardpopup);
  addCardForm.reset();
};

const handleProfileEditButtonClick = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openpopup(profileEditpopup);
};

const handleAddCardButtonClick = () => openpopup(addCardpopup);
const handleProfileEditCloseButtonClick = () => closepopup(profileEditpopup);
const handleAddCardCloseButtonClick = () => closepopup(addCardpopup);
const handlePicturepopupCloseButtonClick = () => closepopup(picturepopup);

// Open and Close popups
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);
profileEditCloseButton.addEventListener(
  "click",
  handleProfileEditCloseButtonClick
);
addCardCloseButton.addEventListener("click", handleAddCardCloseButtonClick);
picturepopupCloseButton.addEventListener(
  "click",
  handlePicturepopupCloseButtonClick
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
    openPicturepopup(cardData.link, cardData.name)
  );
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  trashButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
};

const openPicturepopup = (imageSrc, imageTitle) => {
  picturepopupImage.src = imageSrc;
  picturepopupImage.alt = imageTitle;
  const captionElement = picturepopup.querySelector(".popup__caption");
  captionElement.textContent = imageTitle;

  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    picturepopupContainer.classList.remove("popup_landscape", "popup_portrait");
    if (img.width > img.height) {
      picturepopupContainer.classList.add("popup_landscape");
    } else {
      picturepopupContainer.classList.add("popup_portrait");
    }
    openpopup(picturepopup);
  };
};

// Initialize Cards
initialCards.forEach((cardData) => {
  const cardElement = getCardEl(cardData);
  cardListEl.prepend(cardElement);
});

// Attach overlay click event listener
document.addEventListener("click", handleOverlayClick);
