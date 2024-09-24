export default class UserInfo {
  // Constructor initializes the class with the selectors for name, description, and avatar elements
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector); // Avatar selector
  }

  // Method to get the current user information (name, description, avatar) from the DOM
  getUserInfo() {
    return {
      name: this._nameElement.textContent, // Get the name from the DOM element
      description: this._descriptionElement.textContent, // Get the description
      avatar: this._avatarElement.src, // Get the avatar URL
    };
  }

  // Method to update the user's information in the DOM (name, description, avatar)
  setUserInfo({ name, description, avatar }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;

    // If avatar is provided, update the avatar in the DOM
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
