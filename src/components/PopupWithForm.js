// Import the base Popup class
import Popup from "./Popup.js";

// PopupWithForm extends Popup to handle forms inside a popup
export default class PopupWithForm extends Popup {
  // Constructor takes the popup selector and a function to handle form submission
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;

    // Check if there's a form element, as some popups might not have one
    this.formElement = this._popupElement.querySelector(".popup__form") || null;

    // Find the submit button and store its initial text
    if (this.formElement) {
      this._submitBtn = this.formElement.querySelector(".popup__button");
      this._submitBtnText = this._submitBtn.textContent; // Store initial button text
    }

    // If a form exists, get input fields
    if (this.formElement) {
      this.inputList = Array.from(
        this.formElement.querySelectorAll(".popup__input")
      );
    }
  }

  // Method to get input values from the form
  __getInputValues() {
    const inputValues = {};
    if (this.formElement) {
      this.inputList.forEach((input) => {
        inputValues[input.name] = input.value;
      });
    }
    return inputValues;
  }

  // Method to handle the loading state of the submit button
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText; // Revert to initial text
    }
  }

  // Add event listeners to the form
  setEventListeners() {
    super.setEventListeners();

    if (this.formElement) {
      this.formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.handleFormSubmit(this.__getInputValues());
        this.formElement.reset(); // Reset only if the form exists
      });
    }
  }

  // Close popup and reset the form if applicable
  close() {
    if (this.formElement) {
      this.formElement.reset(); // Reset form fields if applicable
    }
    super.close(); // Call the base class close method
  }
}
