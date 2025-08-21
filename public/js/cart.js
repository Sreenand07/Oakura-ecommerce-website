// === Elements
const emptyCart = document.getElementById('emptyCart');
const cartActionArea = document.getElementById('cartActionArea');
const cartAddForm = document.getElementById('cartAddForm');
const cartTable = document.getElementById('cartTable');
const cartTableBody = cartTable.querySelector('tbody');
const grandTotal = document.getElementById('grandTotal');

// === Show/hide cart views
function updateCartView() {
  if (cartTableBody.children.length === 0) {
    emptyCart.style.display = "flex";
    cartActionArea.classList.remove("show");
  } else {
    emptyCart.style.display = "none";
    cartActionArea.classList.add("show");
  }
}

// === Recalc grand total
function updateGrandTotal() {
  let sum = 0;
  for (const row of cartTableBody.children) {
    sum += parseFloat(row.dataset.rowTotal);
  }
  grandTotal.textContent = `$${sum.toFixed(2)}`;
}

// === Add item handler
cartAddForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const qty = parseInt(document.getElementById("itemQty").value) || 1;

  if (!name || price <= 0 || qty <= 0) {
    alert("Please enter a valid furniture name, price, and quantity.");
    return;
  }

  const rowTotal = price * qty;

  // Create row
  const tr = document.createElement('tr');
  tr.dataset.rowTotal = rowTotal;

  tr.innerHTML = `
    <td>${name}</td>
    <td>$${price.toFixed(2)}</td>
    <td>${qty}</td>
    <td>$${rowTotal.toFixed(2)}</td>
    <td><button type="button" class="remove-btn"><i class="fa fa-trash"></i> Remove</button></td>
  `;

  // Remove item handler
  tr.querySelector('.remove-btn').onclick = function() {
    cartTableBody.removeChild(tr);
    updateCartView();
    updateGrandTotal();
  };

  cartTableBody.appendChild(tr);
  cartAddForm.reset();
  updateCartView();
  updateGrandTotal();
});

// === Start with empty cart
updateCartView();
updateGrandTotal();
