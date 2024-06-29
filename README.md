# Project 3: Around the U.S

## Overview

"Around the U.S." is a responsive web page that allows users to view profiles, add new content, and interact with cards featuring various destinations around the United States (and nearby areas). The project demonstrates responsiveness and smooth transitions between different screen sizes.

## Layout

Header Section:
Displays the site logo with a bottom border.
Profile Section:
Shows a user's profile picture, name, and description. Users can edit their profile name and title via a modal.
Add Button:
Allows users to add new content (cards).
Card Section:
Displays cards featuring different destinations. Each card includes an image, title, like button, and delete button.
Footer:
Standard footer displaying the year of production (2024).
Edit Profile Feature:
:Users can edit their profile information through a modal that opens on clicking the "Edit Profile" button.

## Rendering Cards

The logic to iterate through the array of cards was initially written using a for loop. This was refactored to use the forEach array method, which is more concise and common in practice for iterating over arrays.

## New Features

Form for Adding a Card:
A form for adding new cards was added. This form is displayed when the user clicks the "+" button and can be closed by clicking the "Close" button.

Adding a Card:
A feature was developed to allow users to add custom cards. Users can enter a name and a link to an image. Upon clicking the "Save" button, the new card appears at the beginning of the card container, and the form modal closes simultaneously.

The "Like" Button:
The "Like" button was implemented. When a user clicks on the "Like" button, the heart icon changes its color to indicate the like.

Deleting a Card:
A delete icon was added to the cards. The delete button is functional, allowing users to remove cards from the list.

Opening the Picture Modal:
When a user clicks on a picture, a modal box with the picture opens. The modal can be closed by clicking the "Close" button.

## Aesthetics

The modal boxes were enhanced to open and close smoothly. The modals transition from transparent to visible when opened and vice versa when closed, ensuring a smooth user experience.

## Existing Features

The "Edit Profile" feature allows users to open and close a modal where they can edit their profile information.

- The modal is triggered by clicking the "Edit Profile" button located in the profile section.
- This button adds the `modal__opened` class to the modal element, making it visible.
- The modal can be closed by clicking the close button (styled as an 'X') within the modal.
- This action removes the `modal__opened` class from the modal element, hiding it from view.
  This feature ensures a smooth and intuitive user experience for editing profile information.

## Fonts

Download: https://rsms.me/inter/
Fonts @ _project_/vendor/fonts.
Imported into index.css.

## Figma

https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1

## Images

Images exported from Figma (see above) then housed in project's image directory.

## Languages Used

- HTML
- CSS
- JS

## GitHub Pages

https://unfrank.github.io/se_project_aroundtheus/

## Explanatory Video

https://1drv.ms/v/s!AtgB2CGDAMapgq9X2pg4-X6mLSPwiA?e=yGSKzO
