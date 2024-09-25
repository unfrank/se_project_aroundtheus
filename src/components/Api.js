export default class Api {
  // Constructor initializes API with a base URL and authorization headers
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Method to check the server's response and handle errors
  _checkResponse(res) {
    if (res.ok) {
      return res.json(); // Return JSON if response is OK
    }
    return Promise.reject(`Error: ${res.status}`); // Reject promise with error status
  }

  // General error handler for catching and logging errors
  _handleError(err) {
    console.error(err); // Log error to console
    return Promise.reject(err); // Reject the promise with the error
  }

  // Fetch initial set of cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers, // Pass authorization headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Return JSON if response is OK
        }
        return Promise.reject(`Error: ${res.status}`); // Reject if there's an error
      })
      .catch((err) => {
        console.error("API error:", err); // Log the error
        return Promise.reject(err); // Propagate the error
      });
  }

  // Fetch user information from the server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers, // Authorization headers for the request
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Update user information (name, about) on the server
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH", // PATCH request for partial updates
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }), // JSON body with updated data
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Add a new card (name, link) to the server
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST", // POST request to create new card
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }), // JSON body with card details
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Delete a card by its ID
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE", // DELETE request to remove the card
      headers: this._headers, // Authorization headers
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Like a card by sending a PUT request to the server
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT", // PUT request to like the card
      headers: this._headers,
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Dislike a card by sending a DELETE request to the server
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE", // DELETE request to remove the like
      headers: this._headers,
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }

  // Update user avatar by sending a PATCH request with the new avatar URL
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH", // PATCH request for partial updates
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl, // JSON body with new avatar URL
      }),
    })
      .then(this._checkResponse) // Handle response validation
      .catch(this._handleError); // Handle errors
  }
}
