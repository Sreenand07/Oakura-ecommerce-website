const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

// ✅ Import Contact model
const Contact = require("./models/Contact");

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/oakura-cart", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected successfully");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Setup session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: true
}));

// ✅ Import routes
const routes = require("./routes/index");
app.use("/", routes);

// ✅ Contact form submission (POST)
app.post("/contact", async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message
    });

    await newContact.save();
    console.log("📩 New contact form submitted:", newContact);

    res.redirect("/contact"); // After submit, redirect to contact page
  } catch (err) {
    console.error("❌ Error saving contact form:", err);
    res.status(500).send("Failed to submit contact form");
  }
});

// ✅ Optional direct route to home.ejs
app.get("/home", (req, res) => {
  res.render("pages/home");
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Oakura is running at http://localhost:${PORT}`);
});
