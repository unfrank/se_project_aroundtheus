export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Data to render
    this._renderer = renderer; // Function to render each item
    this._container = document.querySelector(containerSelector); // Container for cards
  }

  // Renders all items on initialization
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item); // Render each item by calling addItem
    });
  }

  // Add a new card to the container and use the renderer
  addItem(itemData) {
    const renderedItem = this._renderer(itemData); // Render the item
    this._container.prepend(renderedItem); // Add it to the DOM
  }
}
