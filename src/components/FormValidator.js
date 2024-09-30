export default class FormValidator {
  // Constructor initializes the class with validation settings and the form element to be validated
  constructor(settings, formElement) {
    this._settings = settings; // Object containing validation settings (selectors, classes)
    this._formElement = formElement; // The form element that will be validated

    // Create an array of all input elements inside the form
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    // Select the submit button inside the form
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Private method to check if any input field is invalid
  _hasInvalidInput() {
    // Check if any input field in the form is invalid
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method to enable or disable the submit button based on form validity
  _toggleButtonState() {
    // If there's any invalid input, disable the submit button; otherwise, enable it
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Private method to check the validity of a specific input element and show/hide error messages
  _checkInputValidity(inputElement) {
    // Find the corresponding error message element for the input field
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      // Add the error class and show the validation message if the input is invalid
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      // Remove the error class and clear the error message if the input is valid
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    }
  }

  // Private method to set up event listeners for input fields
  _setEventListeners() {
    // Check the button state initially in case some fields are already filled
    this._toggleButtonState();

    // Add event listeners to all input fields in the form
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // Check the validity of the input field in real-time and update the button state
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Public method to enable validation (sets up the event listeners for the form)
  enableValidation() {
    this._setEventListeners();
  }

  // Public method to reset form validation (clear errors and reset button state)
  resetValidation() {
    // Loop through all input fields in the form
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      // Remove any error classes and clear error messages
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
    });

    // Reset the submit button's state
    this._toggleButtonState();
  }

  // Public method to disable the submit button
  disableButton() {
    // Add a class to disable the button and set the disabled attribute to true
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
