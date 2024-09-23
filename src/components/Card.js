export default class Card {
  constructor({ name, link, _id, likes }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes; // List of users who liked the card
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._likeCountEl = this._cardElement.querySelector(".card__like-count"); // Assuming there’s a span to show like count

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    // Set the initial like state and count
    this._setLikeState();

    return this._cardElement;
  }

  // Check if the card is liked and update the heart icon
  _setLikeState() {
    const userLiked = this._likes.some((user) => user._id === "your-user-id"); // Replace "your-user-id" with the actual user ID
    if (userLiked) {
      this._likeButton.classList.add("card__like-button_active"); // Change heart color
      this._isLiked = true;
    } else {
      this._likeButton.classList.remove("card__like-button_active");
      this._isLiked = false;
    }
    this._likeCountEl.textContent = this._likes.length;
  }

  _toggleLike() {
    if (this._isLiked) {
      api
        .dislikeCard(this._id) // Unlike the card
        .then((updatedCard) => {
          this._likes = updatedCard.likes; // Update the likes array
          this._setLikeState(); // Update UI based on the new like status
        })
        .catch((err) => console.error(`Error unliking card: ${err}`));
    } else {
      api
        .likeCard(this._id) // Like the card
        .then((updatedCard) => {
          this._likes = updatedCard.likes; // Update the likes array
          this._setLikeState(); // Update UI based on the new like status
        })
        .catch((err) => console.error(`Error liking card: ${err}`));
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike(); // Toggle like/unlike on click
    });

    this._trashButton.addEventListener(
      "click",
      () => handleDeleteCard(this._cardElement, this._id) // Open delete confirmation
    );

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
