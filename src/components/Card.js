export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    cardSelector,
    handleImageClick,
    currentUserId,
    api,
    handleDeleteCard // Added handleDeleteCard to constructor
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes; // List of users who liked the card
    this._owner = owner; // Owner ID of the card
    this._currentUserId = currentUserId; // The current logged-in user's ID
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api; // Reference to the API class instance
    this._handleDeleteCard = handleDeleteCard; // Reference to handleDeleteCard function
  }

  _createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardElement;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeCountEl = this._cardElement.querySelector(".card__like-count");

    // Set the card data
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    // Hide the trash button if the current user is not the card owner
    if (this._owner !== this._currentUserId) {
      this._trashButton.style.display = "none";
    }

    // Set the initial like state and count
    this._setLikeState();

    return this._cardElement;
  }

  // Check if the card is liked by the current user and update the heart icon
  _setLikeState() {
    if (Array.isArray(this._likes)) {
      if (this._likes.length === 0) {
        this._likeCountEl.textContent = 0;
        this._likeButton.classList.remove("card__like-button_active");
        this._isLiked = false;
      } else {
        const userLiked = this._likes.some(
          (user) => user._id === this._currentUserId
        );
        if (userLiked) {
          this._likeButton.classList.add("card__like-button_active");
          this._isLiked = true;
        } else {
          this._likeButton.classList.remove("card__like-button_active");
          this._isLiked = false;
        }
        this._likeCountEl.textContent = this._likes.length;
      }
    } else {
      console.error("Likes data is not an array:", this._likes);
      this._likes = []; // Default to an empty array if undefined
      this._likeCountEl.textContent = 0;
    }
  }

  // Toggle like/unlike card
  _toggleLike() {
    console.log("Like button clicked, current like state:", this._isLiked);
    if (this._isLiked) {
      this._api
        .dislikeCard(this._id)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this._setLikeState();
        })
        .catch((err) => console.error(`Error unliking card: ${err}`));
    } else {
      this._api
        .likeCard(this._id)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this._setLikeState();
        })
        .catch((err) => console.error(`Error liking card: ${err}`));
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike(); // Toggle like/unlike on click
    });

    // Show delete confirmation if the current user owns the card
    if (this._owner === this._currentUserId) {
      this._trashButton.addEventListener(
        "click",
        () => this._handleDeleteCard(this._cardElement, this._id) // Use this._handleDeleteCard
      );
    }

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  getView() {
    this._createCardElement();
    this._setEventListeners();
    return this._cardElement;
  }
}
