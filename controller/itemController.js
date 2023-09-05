const Product = require('../models/product');

exports.createItem = (req, res) => {
    const item = req.body;
    db.insert(item, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};

exports.getItems = async (req, res) => {
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
};