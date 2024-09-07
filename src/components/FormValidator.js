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
    // Use the 'some' array method to check if any input field is invalid
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method to enable or disable the submit button based on form validity
  _toggleButtonState() {
    // If any input is invalid, disable the submit button, otherwise enable it
    if (this._hasInvalidInput()) {
      this.disableButton(); // Disable the button if there is an invalid input
    } else {
      // Enable the button by removing the inactive class and setting the disabled property to false
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Private method to check the validity of a specific input element and show/hide error messages
  _checkInputValidity(inputElement) {
    // Select the error message element associated with the input field
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    // If the input is invalid, show the error message and apply the error class
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._settings.inputErrorClass); // Add error class to the input
      errorElement.textContent = inputElement.validationMessage; // Display the validation error message
    } else {
      // If the input is valid, remove the error class and clear the error message
      inputElement.classList.remove(this._settings.inputErrorClass); // Remove error class
      errorElement.textContent = ""; // Clear the error message
    }
  }

  // Private method to set up event listeners for input fields
  _setEventListeners() {
    // Initially check the button state to make sure it reflects the form's current state
    this._toggleButtonState();

    // Add an 'input' event listener to each input field to validate the input in real-time
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Check the validity of the input field
        this._toggleButtonState(); // Update the button state based on the current input validity
      });
    });
  }

  // Public method to enable form validation by setting event listeners
  enableValidation() {
    this._setEventListeners(); // Set up event listeners for input fields and form validation
  }

  // Public method to reset form validation (clear errors and reset button state)
  resetValidation() {
    // Clear validation errors for all inputs
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settings.inputErrorClass); // Remove error class
      errorElement.textContent = ""; // Clear the error message
    });

    // Reset the submit button's state
    this._toggleButtonState(); // Ensure the button reflects the current form validity
  }

  // Public method to disable the submit button
  disableButton() {
    // Add the inactive class and set the disabled property to true
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}
