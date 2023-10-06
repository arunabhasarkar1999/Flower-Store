// Function to handle the "Add to Cart" button click event for each product
function addToCart(productName, price, quantityFieldName) {
    // Get the form elements for the specific product
    const quantityInput = parseInt(document.getElementById(quantityFieldName).value);
    const productPrice = parseFloat(price);

    // Validate the quantity (must be at least 1)
    if (quantityInput < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Create or update a shopping cart object (you can use localStorage or a server for this)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.product === productName);

    if (existingProductIndex !== -1) {
        // If the product is already in the cart, add the quantity to the existing quantity
        cart[existingProductIndex].quantity += quantityInput;
        // Recalculate the total price for the updated quantity
        cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * productPrice;
    } else {
        // If the product is not in the cart, add it as a new item
        const totalPrice = quantityInput * productPrice;
        cart.push({ product: productName, price: productPrice, quantity: quantityInput, totalPrice });
    }

    // Calculate the cart total
    const cartTotal = cart.reduce((total, item) => total + item.totalPrice, 0);

    // Add the cartTotal field to the cart object
    cart.cartTotal = cartTotal;

    // Store the updated cart back in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the displayed cart total
    document.getElementById('cartTotal').textContent = 'Rs.' + cartTotal;

    // Provide feedback to the user, like displaying a confirmation message
    alert(`Added ${quantityInput} ${productName}(s) to your cart.`);

    // Refresh the cart items display
    displayCartItems();
}

// Function to display the cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear the previous content

    let cartTotal = 0; // Initialize cart total

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.product} - Quantity: ${item.quantity} - Total Price: Rs.${item.totalPrice}</p>
        `;
        cartItemsDiv.appendChild(itemDiv);

        cartTotal += item.totalPrice; // Update cart total
    });

    // Update the displayed cart total
    document.getElementById('cartTotal').textContent = 'Rs.' + cartTotal;
}

// Function to handle the checkout process
function checkout() {
    // Implement the checkout logic, e.g., redirect to a payment page
    alert('Redirecting to the checkout page...');
    // You can add more logic here for the actual checkout process
}

// Initial display of cart items and total when the page loads
displayCartItems();
