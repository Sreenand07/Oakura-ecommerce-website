// Get references to elements
const addItemBtn = document.getElementById('addItemBtn');
const itemInput = document.getElementById('itemInput');
const wishlistTable = document.getElementById('wishlistTable');
const wishlistTableBody = wishlistTable.querySelector('tbody');
const emptyCard = document.getElementById('empty-card');

// Toggle visibility based on wishlist items count
function toggleWishlistDisplay() {
  if (wishlistTableBody.children.length > 0) {
    wishlistTable.style.display = 'table';
    emptyCard.style.display = 'none';
  } else {
    wishlistTable.style.display = 'none';
    emptyCard.style.display = 'flex';
  }
}

// Initialize display state
toggleWishlistDisplay();

// Add item event listener
addItemBtn.addEventListener('click', () => {
  const itemName = itemInput.value.trim();
  if (!itemName) {
    alert('Please enter an item name.');
    return;
  }

  // Create new table row
  const newRow = document.createElement('tr');

  // Item name cell
  const itemCell = document.createElement('td');
  itemCell.textContent = itemName;
  newRow.appendChild(itemCell);

  // Action cell with remove button
  const actionCell = document.createElement('td');
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => {
    wishlistTableBody.removeChild(newRow);
    toggleWishlistDisplay();
  };
  actionCell.appendChild(removeBtn);
  newRow.appendChild(actionCell);

  // Append new row to table body
  wishlistTableBody.appendChild(newRow);

  // Clear input field
  itemInput.value = '';

  toggleWishlistDisplay();
});
