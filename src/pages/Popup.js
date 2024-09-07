export default class Popup {
  // Constructor initializes the popup element and binds the ESC key handler
  constructor(popupSelector) {
    // Select the popup element using the provided selector
    this._popupElement = document.querySelector(popupSelector);

    // Bind the _handleEscClose method to ensure it has the correct context when used as an event listener
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Method to open the popup
  open() {
    // Add the class to make the popup visible
    this._popupElement.classList.add("popup_opened");

    // Add an event listener for the ESC key to close the popup when pressed
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Method to close the popup
  close() {
    // Remove the class that makes the popup visible
    this._popupElement.classList.remove("popup_opened");

    // Remove the ESC key event listener when the popup is closed
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Private method to handle closing the popup when ESC is pressed
  _handleEscClose(evt) {
    // Check if the pressed key is 'Escape'
    if (evt.key === "Escape") {
      this.close(); // Close the popup if ESC is pressed
    }
  }

  // Method to set event listeners for the popup (close button and overlay click)
  setEventListeners() {
    // Add click event listener to the close button (popup__close) to close the popup when clicked
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());

    // Add a click event listener on the overlay (the popup itself) to close the popup when the overlay is clicked
    this._popupElement.addEventListener("click", (evt) => {
      // Close the popup if the click target is the popup element (i.e., the overlay)
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
