const db = require('../dbConnection');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.createItem = (req, res) => {
    const item = req.body;
    db.insert(item, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);

        const { email, name, password } = req.body;

        // check email, name and password are exsited or not
        if (!email || !name || !password) {
            return res.status(400).send('Missing email, name or password.');
        }

        // check password
        if (typeof password !== 'string') {
            return res.status(400).send('Invalid password provided.');
        }

        // check email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            name,
            password: hashedPassword,
        });

        await user.save();

        res.redirect('/registration-success');
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = user;
            res.render('login-success', { user });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const multer = require('multer');
const Product = require('../models/product');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({ storage: storage });

exports.uploadProductMiddleware = upload.single('productImage');
exports.uploadProduct = async (req, res) => {
    try {
        if (!req.body.productName || !req.body.productPrice || !req.body.productDetails || !req.file) {
            return res.status(400).send('All fields are required');
        }

        //console.log("Received price:", req.body.productPrice); 

        const product = {
            name: req.body.productName,
            imageUrl: '/uploads/' + req.file.filename,
            price: req.body.productPrice,
            details: req.body.productDetails,
            owner: req.session.user._id
        };

        const savedProduct = await Product.create(product);
        req.session.message = "Product uploaded successfully!";

        res.redirect('/profile');
    } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
};






