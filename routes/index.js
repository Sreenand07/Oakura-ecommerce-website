const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); 
const Contact = require("../models/Contact"); // ✅ Import Contact model

// ========================
// PAGE ROUTES
// ========================

// Home page
router.get("/", (req, res) => {
  res.render("pages/home");
});

// Auth page
router.get("/auth", (req, res) => {
  res.render("pages/auth");
});

// Offers page
router.get("/offers", (req, res) => {
  res.render("pages/offers");
});

// Wishlist page
router.get("/wishlist", (req, res) => {
  res.render("pages/wishlist");
});

// Contact page (GET)
router.get("/contact", (req, res) => {
  res.render("pages/contact", { success: false, error: null });
});

// ========================
// CONTACT FORM
// ========================

// Contact page (POST - save to MongoDB)
router.post("/contact", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // ✅ Make sure schema field matches
    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message
    });

    await newContact.save();
    

    // Render contact page again with success message
    res.render("pages/contact", { success: true, error: null });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.render("pages/contact", { success: false, error: "Something went wrong!" });
  }
});

// ========================
// CART ROUTES
// ========================

// Cart page (GET) - display all cart items for current session
router.get("/cart", async (req, res) => {
  try {
    const sessionId = req.sessionID;
    const cartItems = await Cart.find({ sessionId });
    res.render("pages/cart", { cartItems });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).send("Internal server error");
  }
});

// Add to Cart (POST)
router.post("/cart/add", async (req, res) => {
  try {
    const sessionId = req.sessionID;
    const { itemName, itemPrice, itemQty, itemImage } = req.body;

    const newItem = new Cart({
      sessionId,
      name: itemName,
      price: itemPrice,
      quantity: itemQty,
      image: itemImage
    });

    await newItem.save();
    res.status(200).send("✅ Item added to cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).send("❌ Failed to add to cart");
  }
});

// Delete item from cart
router.post("/cart/delete/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect("/cart");
  } catch (err) {
    console.error("Error deleting from cart:", err);
    res.status(500).send("❌ Failed to delete item");
  }
});

// ========================
// AUTH ROUTES (Dummy for now)
// ========================

// Login POST
router.post("/login", (req, res) => {
  res.send("Login submitted");
});

// Signup POST
router.post("/signup", (req, res) => {
  res.send("Signup submitted");
});

module.exports = router;
