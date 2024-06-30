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

const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

const pictureModal = document.querySelector("#picture-modal");
const pictureModalContainer = pictureModal.querySelector(
  ".modal__container_large"
);
const pictureModalImage = pictureModal.querySelector(".modal__image");

const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const pictureModalCloseButton = pictureModal.querySelector(".modal__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addCardForm = document.querySelector("#add-card-form");
const addCardTitleInput = document.querySelector("#add-card-title");
const addCardUrlInput = document.querySelector("#add-card-url");

// Modal Functions
const openModal = (modal) => {
  modal.classList.add("modal_opened");
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
};

// Event Handlers
const handleProfileEditSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileEditForm.reset();
};

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const title = addCardTitleInput.value;
  const url = addCardUrlInput.value;
  const cardData = { name: title, link: url };
  const cardElement = getCardEl(cardData);
  cardListEl.prepend(cardElement);
  closeModal(addCardModal);
  addCardForm.reset();
};

const handleProfileEditButtonClick = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
};

const handleAddCardButtonClick = () => openModal(addCardModal);
const handleProfileEditCloseButtonClick = () => closeModal(profileEditModal);
const handleAddCardCloseButtonClick = () => closeModal(addCardModal);
const handlePictureModalCloseButtonClick = () => closeModal(pictureModal);

// Open and Close Modals
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);
profileEditCloseButton.addEventListener(
  "click",
  handleProfileEditCloseButtonClick
);
addCardCloseButton.addEventListener("click", handleAddCardCloseButtonClick);
pictureModalCloseButton.addEventListener(
  "click",
  handlePictureModalCloseButtonClick
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
    openPictureModal(cardData.link, cardData.name)
  );
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  trashButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
};

const openPictureModal = (imageSrc, imageTitle) => {
  pictureModalImage.src = imageSrc;
  pictureModalImage.alt = imageTitle;
  const captionElement = pictureModal.querySelector(".modal__caption");
  captionElement.textContent = imageTitle;

  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    pictureModalContainer.classList.remove("modal_landscape", "modal_portrait");
    if (img.width > img.height) {
      pictureModalContainer.classList.add("modal_landscape");
    } else {
      pictureModalContainer.classList.add("modal_portrait");
    }
    openModal(pictureModal);
  };
};

// Initialize Cards
initialCards.forEach((cardData) => {
  const cardElement = getCardEl(cardData);
  cardListEl.append(cardElement);
});
