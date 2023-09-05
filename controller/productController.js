const multer = require('multer');
const path = require('path');
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

exports.getAdminPage = async (req, res) => {
    // Fetch all the user feedbacks and listings
    const feedbacks = await Feedback.find({});
    const products = await Product.find({}).populate('owner');
    res.render('admin', { feedbacks, products });
};
