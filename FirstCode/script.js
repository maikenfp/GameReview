// Initialize an array to store items
var itemsArray = [];

function showAddItemForm() {
  document.getElementById('addItemForm').style.display = 'block';
}

function addItem() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var imageInput = document.getElementById('image');
  var image = imageInput.files[0];

  if (!title || !description || !image) {
    alert('Please fill in all fields');
    return;
  }

  // Create an object for the new item
  var newItem = {
    title: title,
    description: description,
    image: URL.createObjectURL(image)
  };

  // Add the new item to the array
  itemsArray.push(newItem);

  // Update the panelContainer with the new items
  updatePanelContainer();

  // Reset form fields
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  imageInput.value = '';

  // Hide the form
  document.getElementById('addItemForm').style.display = 'none';
}

document.getElementById('searchInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchItems();
  }
});

function searchItems() {
  var searchInput = document.getElementById('searchInput').value.toLowerCase();

  // Filter items based on the search input
  var filteredItems = itemsArray.filter(function (item) {
    return item.title.toLowerCase().includes(searchInput) ||
      item.description.toLowerCase().includes(searchInput);
  });

  updatePanelContainer(filteredItems);
}

function updatePanelContainer(searchInput = '') {
  var panelContainer = document.getElementById('panelContainer');
  // Clear existing panels
  panelContainer.innerHTML = '';

  // Filter items based on the search input
  var filteredItems = itemsArray.filter(function (item) {
    return item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.description.toLowerCase().includes(searchInput.toLowerCase());
  });

  // Loop through the filteredItems and create panels
  filteredItems.forEach(function (item) {
    var panelItem = document.createElement('div');
    panelItem.className = 'panel';
    panelItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="panel-content">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    `;
    panelContainer.appendChild(panelItem);
  });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  updatePanelContainer(); // Update with the original itemsArray to show all items
}


function cancelAddItem() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('image').value = '';

  document.getElementById('addItemForm').style.display = 'none';
}