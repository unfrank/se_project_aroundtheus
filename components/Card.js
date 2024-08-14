export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _createCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement = cardElement;
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    return this._cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const trashButton = this._cardElement.querySelector(".card__trash-button");

    likeButton.addEventListener("click", () =>
      likeButton.classList.toggle("card__like-button_active")
    );

    trashButton.addEventListener("click", () => this._cardElement.remove());

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
