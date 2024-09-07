export default class Section {
  // Constructor initializes the class with items, renderer function, and container selector
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array of data items to be rendered
    this._renderer = renderer; // Function responsible for rendering each item
    this._container = document.querySelector(containerSelector); // DOM element where items will be rendered
  }

  // Method to render all initial items
  renderItems() {
    // Loop through each item and render it
    this._items.forEach((item) => {
      this.addItem(item); // Add each rendered item to the container
    });
  }

  // Method to add a single rendered item to the container
  addItem(itemData) {
    const renderedItem = this._renderer(itemData); // Call the renderer function for the item
    this._container.prepend(renderedItem); // Add the rendered item to the top of the container
  }
}
