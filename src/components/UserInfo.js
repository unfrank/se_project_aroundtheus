// The UserInfo class is responsible for managing and updating user information on the page
export default class UserInfo {
  // The constructor accepts an object with CSS selectors for the user's name, description, and avatar
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    // Store the DOM elements for name, description, and avatar based on the provided selectors
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Method to get the current user information from the page
  getUserInfo() {
    // Returns an object with the current name, description, and avatar URL from the page
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Method to update the user information on the page
  setUserInfo({ name, description, avatar }) {
    // Update the name and description on the page
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;

    // Update the avatar
    this._avatarElement.src = avatar;
  }
}
