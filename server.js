const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const connectDB = require("./dbConnection");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const feedbackRoutes = require("./routes/feedback");
const itemRoutes = require("./routes/item");
const viewRoutes = require("./routes/view");
const transactionRoutes = require("./routes/transaction");
const transactionDetailRoutes = require("./routes/transactionDetail");
const messageRoutes = require("./routes/message");
const app = express();

connectDB();

// Session Configuration
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

// Body Parser Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Static File Hosting
app.use(express.static(__dirname + "/"));

// View Engine Configuration
app.set("view engine", "ejs");

// Registering API routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/item", itemRoutes);
app.use("/transaction", transactionRoutes);
app.use("/transaction-detail", transactionDetailRoutes);
app.use("/message", messageRoutes);

// Registering View routes
app.use("/", viewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
