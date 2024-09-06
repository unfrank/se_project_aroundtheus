export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    // Check if the popup element exists, throw an error if not
    if (!this._popupElement) {
      throw new Error(`Popup element with selector ${popupSelector} not found`);
    }

    this._closeButton = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  // Opens the popup
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Closes the popup
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Private method to handle "Esc" key press to close popup
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Private method to handle overlay click to close popup
  _handleOverlayClick(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  // Sets event listeners for closing popup
  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
  }
}
