export default class Card {
  // Constructor initializes the card object with its properties and handles passed as arguments
  constructor(
    { name, link, _id, isLiked, likes = [], owner },
    cardSelector,
    handleImageClick,
    currentUserId,
    api,
    handleDeleteCard
  ) {
    this._name = name; // Card's name/title
    this._link = link; // URL to the card's image
    this._id = _id; // Unique ID of the card
    this._isLiked = isLiked; // Whether the current user has liked the card
    this._likes = likes; // Array of users who have liked the card
    this._owner = owner; // ID of the user who owns the card
    this._currentUserId = currentUserId; // ID of the current user (to check ownership)
    this._cardSelector = cardSelector; // Template selector for creating the card
    this._handleImageClick = handleImageClick; // Function to handle image click events (for opening a larger image)
    this._api = api; // Reference to the API class to make like/unlike requests
    this._handleDeleteCard = handleDeleteCard; // Function to handle card deletion
  }

  // Private method to update the like button's state (active if liked)
  setLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active"); // Adds the active class to fill the heart
    } else {
      this._likeButton.classList.remove("card__like-button_active"); // Removes the active class to unfill the heart
    }
  }

  // Private method to toggle like/unlike behavior
  toggleLike() {
    if (this._isLiked) {
      // If card is liked, send request to unlike the card
      this._api
        .dislikeCard(this._id)
        .then((updatedCard) => {
          // this._isLiked = false; // Update local like state
          this._isLiked = updatedCard.isLiked; // Update likes array
          this.setLikeState(); // Re render like state
        })
        .catch((err) => console.error(`Error unliking card: ${err}`)); // Handle errors
    } else {
      // If card is not liked, send request to like the card
      this._api
        .likeCard(this._id)
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked; // Update the isLiked property from the response
          // this._likes = updatedCard.likes || []; // Update likes array
          this.setLikeState(); // Re render like state
        })
        .catch((err) => console.error(`Error liking card: ${err}`)); // Handle errors
    }
  }

  // Private method to set up event listeners for card actions
  setEventListeners() {
    // Listen for like button clicks to toggle like/unlike
    this._likeButton.addEventListener("click", () => {
      this.toggleLike();
    });

    // If the card belongs to the current user, set up the delete button
    if (this._owner === this._currentUserId) {
      this._trashButton.addEventListener(
        "click",
        () => this._handleDeleteCard(this._cardElement, this._id) // Call delete handler with card info
      );
    }

    // Listen for image clicks to open a larger view of the image
    this._cardImageEl.addEventListener(
      "click",
      () => this._handleImageClick(this._link, this._name) // Call image click handler
    );
  }

  // Public method to create the card view and set up event listeners
  getView() {
    this.createCardElement(); // Create the card element
    this.setEventListeners(); // Attach event listeners to the card
    return this._cardElement; // Return the created card element
  }

  // Private method to create and return the card element from the template
  createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector) // Select the card template
      .content.querySelector(".card") // Select the card structure inside the template
      .cloneNode(true); // Clone the structure to create a new card

    // Store references to various card elements
    this._cardElement = cardElement;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    // Set the card's title, image source, and alt text
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    // Set the initial like state (active/inactive)
    this.setLikeState();

    return this._cardElement; // Return the constructed card element
  }
}
