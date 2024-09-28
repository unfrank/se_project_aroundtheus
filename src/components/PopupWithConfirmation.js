import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.confirmButton = this._popupElement.querySelector(
      ".popup__button_confirm-delete"
    );
    this.handleConfirm = null; // Initialize to null to store the confirmation handler
  }

  // Set the confirm handler dynamically and remove previous handlers
  setConfirmHandler(handleConfirm) {
    this.handleConfirm = handleConfirm;

    // Remove any previously added event listeners
    this.confirmButton.removeEventListener("click", this._boundHandleConfirm);

    // Bind the confirm handler and store it for later removal
    this._boundHandleConfirm = () => {
      this.handleConfirm();
    };

    // Add the new event listener for the confirmation button
    this.confirmButton.addEventListener("click", this._boundHandleConfirm, {
      once: true,
    });
  }

  // Override the setEventListeners to set default popup behaviors
  setEventListeners() {
    super.setEventListeners(); // Inherit the default listeners

    // Close the popup when clicking outside the popup content (on the overlay)
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });

    // Close the popup when clicking the close button
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());
  }
}
