// This class handles the basic functionality for opening and closing popups.
export default class Popup {
  constructor(popupSelector) {
    // Select the popup element using the provided selector.
    this._popupElement = document.querySelector(popupSelector);

    // Bind the context of the _handleEscClose method to this instance
    // This ensures that the 'this' keyword inside _handleEscClose refers to the class instance
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Method to open the popup and add an event listener to detect the "Escape" key press
  open() {
    // Add a class to open the popup
    this._popupElement.classList.add("popup_opened");

    // Attach an event listener to the document to detect the "Escape" key press and close the popup
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Method to close the popup and remove the "Escape" key event listener
  close() {
    // Remove the class that opens the popup
    this._popupElement.classList.remove("popup_opened");

    // Remove the "keydown" event listener when the popup is closed
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Private method to handle closing the popup when the "Escape" key is pressed
  _handleEscClose(evt) {
    // If the "Escape" key is pressed, close the popup
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Method to set up event listeners for the popup (close button and background click)
  setEventListeners() {
    // Find and attach an event listener to the close button of the popup
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close(); // Close the popup when the close button is clicked
      });

    // Add an event listener to the popup to close it when clicking on the background (outside the popup content)
    this._popupElement.addEventListener("mousedown", (evt) => {
      // If the user clicks directly on the popup background, close the popup
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
