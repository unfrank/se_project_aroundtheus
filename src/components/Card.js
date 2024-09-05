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
