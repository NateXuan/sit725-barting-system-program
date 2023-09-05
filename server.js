const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./dbConnection');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const itemRoutes = require('./routes/itemRoutes');
const viewRoutes = require('./routes/viewRoutes');
const app = express();

connectDB();

// Session Configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Body Parser Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Static File Hosting
app.use(express.static(__dirname + '/'));

// View Engine Configuration
app.set('view engine', 'ejs');

// Registering API routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/item', itemRoutes);

// Registering View routes
app.use('/', viewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
