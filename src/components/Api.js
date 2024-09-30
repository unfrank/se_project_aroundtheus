export default class Api {
  // Constructor initializes API with a base URL and authorization headers
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // General method to handle fetch requests and check responses
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
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
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers, // Pass authorization headers
    }).catch(this._handleError); // Handle errors
  }

  // Fetch user information from the server
  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers, // Authorization headers for the request
    }).catch(this._handleError); // Handle errors
  }

  // Update user information (name, about) on the server
  updateUserInfo({ name, about }) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH", // PATCH request for partial updates
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }), // JSON body with updated data
    }).catch(this._handleError); // Handle errors
  }

  // Add a new card (name, link) to the server
  addCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST", // POST request to create new card
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }), // JSON body with card details
    }).catch(this._handleError); // Handle errors
  }

  // Delete a card by its ID
  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE", // DELETE request to remove the card
      headers: this.headers, // Authorization headers
    }).catch(this._handleError); // Handle errors
  }

  // Like a card by sending a PUT request to the server
  likeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT", // PUT request to like the card
      headers: this.headers,
    }).catch(this._handleError); // Handle errors
  }

  // Dislike a card by sending a DELETE request to the server
  dislikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE", // DELETE request to remove the like
      headers: this.headers,
    }).catch(this._handleError); // Handle errors
  }

  // Update user avatar by sending a PATCH request with the new avatar URL
  updateAvatar(avatarUrl) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH", // PATCH request for partial updates
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl, // JSON body with new avatar URL
      }),
    }).catch(this._handleError); // Handle errors
  }
}
