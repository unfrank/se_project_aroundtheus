export default class Card {
  // Constructor initializes the card with its data, selector for the card template, and image click handler
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name; // The name/title of the card
    this._link = link; // The URL of the card's image
    this._cardSelector = cardSelector; // The selector for the card template
    this._handleImageClick = handleImageClick; // Function to handle when the card image is clicked
  }

  // Private method to create a new card element by cloning the card template
  _createCardElement() {
    // Select the card template and clone it
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); // Deep clone the card structure

    // Store references to key elements of the card
    this._cardElement = cardElement; // The main card element
    this._cardImageEl = this._cardElement.querySelector(".card__image"); // The image element
    this._cardTitleEl = this._cardElement.querySelector(".card__title"); // The title element

    // Set the card's title and image attributes (src and alt)
    this._cardTitleEl.textContent = this._name; // Set the card's title
    this._cardImageEl.src = this._link; // Set the card's image URL
    this._cardImageEl.alt = this._name; // Set the image alt text to the card's name (for accessibility)

    return this._cardElement; // Return the fully created card element
  }

  // Private method to set up event listeners for card actions (like, delete, and image click)
  _setEventListeners() {
    // Select the like and trash buttons within the card
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const trashButton = this._cardElement.querySelector(".card__trash-button");

    // Add a click event listener to toggle the "like" state
    likeButton.addEventListener("click", () =>
      likeButton.classList.toggle("card__like-button_active")
    );

    // Add a click event listener to remove the card when the trash button is clicked
    trashButton.addEventListener("click", () => this._cardElement.remove());

    // Add a click event listener to the image to handle image click events (e.g., opening a popup)
    this._cardImageEl.addEventListener(
      "click",
      () => this._handleImageClick(this._link, this._name) // Pass the image link and name to the click handler
    );
  }

  // Public method to return the fully set up card element
  getView() {
    this._createCardElement(); // Create the card element
    this._setEventListeners(); // Set up event listeners for card interactions
    return this._cardElement; // Return the card element for rendering in the DOM
  }
}
