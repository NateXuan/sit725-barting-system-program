const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const connectDB = require('./dbConnection');
const userController = require('./controller/controller');
const feedbackRoutes = require('./routes/feedback');
const Product = require('./models/product');

connectDB();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Feedback routes
app.use('/', feedbackRoutes);

// API routes
app.use('/api', router);

// User-related routes and views
app.get('/home', (req, res) => {
    let user = req.session.user;
    res.render('home', { user: user });
});

app.get('/info', (req, res) => {
    let user = req.session.user;
    res.render('info', { user: user });
});

app.get('/item', async (req, res) => {
    let filter = {};

    if (req.query.priceRange) {
        switch (req.query.priceRange) {
            case '0-100':
                filter.price = { $gte: 0, $lte: 100 };
                break;
            case '100-300':
                filter.price = { $gte: 100, $lte: 300 };
                break;
            case '300-500':
                filter.price = { $gte: 300, $lte: 500 };
                break;
            case '500-1000':
                filter.price = { $gte: 500, $lte: 1000 };
                break;
            case 'gt1000':
                filter.price = { $gte: 1000 };
                break;
        }
    }

    let user = req.session.user;
    let items = await Product.find(filter);
    res.render('item', { 
        items: items, 
        user: user,
        priceRange: req.query.priceRange || 'all'
    });
});

app.get('/product-detail/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('owner');
    let user = req.session.user;
    res.render('product-detail', { product: product, user: user });
});

app.get('/register-page', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/registration-success', (req, res) => {
    res.render('registration-success');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', userController.loginUser);

app.get('/profile', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    let products = await Product.find({ owner: req.session.user._id });
    let message = req.session.message || null;
    req.session.message = null;
    res.render('profile', { 
        user: req.session.user, 
        products: products,
        message: message
    });
});

app.get('/search', async (req, res) => {
    const term = req.query.term;
    if (!term) {
        return res.redirect('/home'); 
    }

    try {
        let products = await Product.find({ 
            name: new RegExp(term, 'i') 
        });

        res.render('searchResult', { 
            products: products,
            user: req.session.user
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Static files
app.use(express.static(__dirname + '/'));

app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
