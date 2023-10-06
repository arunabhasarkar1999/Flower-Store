// Function to handle the "Add to Cart" button click event for each product
function addToCart(productName, price, quantityFieldName) {
    // Get the form elements for the specific product
    const quantityInput = quantityFieldName;
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
    console.log(cart);

    // Store the updated cart back in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Provide feedback to the user, like displaying a confirmation message
    alert(`Added ${quantityInput} ${productName}(s) to your cart.`);
}
