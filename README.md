# Around the U.S.

## Overview

"Around the U.S." is an interactive web application showcasing various scenic locations across the United States. It allows users to edit their profile, add new places via cards, like and delete cards, and view larger images in a popup. The project emphasizes dynamic interaction, validation, and responsiveness.

## Features

- **Profile Section**: Displays the user's profile picture, name, and description. Users can edit their profile and update the avatar.
- **Add Card Functionality**: Users can add new locations by entering the place name and image URL.
- **Like & Delete Cards**: Cards display locations, and users can like or delete cards dynamically.
- **Popup for Image Viewing**: Clicking on a card image opens a full-size image in a popup.
- **Form Validation**: Form inputs are validated using a universal validation system to ensure proper data entry.
- **Responsive Design**: The layout adjusts smoothly across various screen sizes.
- **Server Communication**: The app interacts with a server via an API for managing cards and user data.

## Technologies Used

- **HTML5**: Used for structuring content on the web pages.
- **CSS3**: Responsible for styling the application with a focus on BEM methodology for maintainability.
- **JavaScript (ES6+)**: The main programming language used for interactivity.
- **Webpack**: Used for bundling JavaScript modules and processing assets like CSS and images.
- **API**: Communication with the backend to fetch and modify data related to user profiles and cards.
- **Normalize.css**: Ensures consistency across different browsers.

## Application Features

### Profile Section

- Users can edit their profile (name, description, and avatar).
- The profile edit button is easily accessible, and changes are updated after confirmation.

### Adding a New Card

- Clicking the **Add** button opens a popup where users can input the title and image URL of a new place.
- The card is dynamically added to the list after submission.

### Interacting with Cards

- **Like** and **delete** functionalities are available for each card.
- Liking a card updates the like count, while deleting a card removes it after confirmation.
- Clicking on a card image opens a popup displaying the image in full size.

### Form Validation

- All input fields are validated to ensure correct data entry before submission.
- The submit button is enabled only when all fields pass validation.

## Code Overview

### Directories

- **Blocks (BEM)**: CSS files structured by BEM blocks for modular and maintainable styles.
  - Example blocks: `profile.css`, `cards.css`, `popup.css`, etc.
- **Components**: JavaScript files for modular functionality, each class handling a specific task.
  - `Card.js`, `FormValidator.js`, `UserInfo.js`, `Section.js`, `Popup.js`, `Api.js`, etc.
- **Utils**: Contains utility functions such as `formValidationSettings` for validation.
- **Pages**: Contains entry-point files like `index.js` and `index.css`.

### JavaScript Classes

- **Api**: Handles server requests (fetching cards, user profile, updating, and deleting data).
- **Card**: Represents a card and handles its rendering, like and delete functionalities.
- **FormValidator**: Validates forms and manages the state of the submit button.
- **Popup**: A base class to handle opening and closing of popups.
- **PopupWithForm**: Extends `Popup`, specifically for popups containing forms.
- **PopupWithImage**: Extends `Popup` for displaying images in popups.
- **PopupWithConfirmation**: Extends `Popup` to handle confirmations (e.g., for card deletions).
- **UserInfo**: Manages user profile information and avatar updates.
- **Section**: Responsible for rendering a collection of elements (cards).

### CSS

- **BEM Methodology**: Styles are written using the BEM (Block-Element-Modifier) methodology to ensure scalability and maintainability.

### Webpack

- Webpack is configured for bundling JavaScript, processing CSS, and handling assets like images and fonts.
- Includes scripts for `dev` and `build` environments to streamline the development process.

## GitHub Pages

The live version of the project can be viewed at:  
[GitHub Pages](https://unfrank.github.io/se_project_aroundtheus/)

## Explanatory Video

A video demo of the project is available at:  
[Explanatory Video](https://1drv.ms/v/s!AtgB2CGDAMapgq9X2pg4-X6mLSPwiA?e=yGSKzO)
