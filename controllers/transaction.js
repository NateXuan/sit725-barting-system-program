const ObjectId = require("mongodb").ObjectId;
const productModel = require("../models/product");
const transactionModel = require("../models/transaction");
const transactionDetailModel = require("../models/transactionDetail");

exports.getTransaction = (req, res) => {
    const user = req.session.user;
    const { _id } = user;
    transactionModel
        .find({
            $or: [{ user1: _id }, { user2: _id }],
        })
        .populate("user1", "name email")
        .populate("user2", "name email")
        .populate("products1", "name imageUrl price")
        .populate("products2", "name imageUrl price")
        .then((transactions) => {
            transactions.sort(compareTransactionByStatus);
            const selectedId =
                req.params.selectedId || transactions[0]._id.toString() || null;
            const selectedTransaction = transactions.find(
                (e) => (e._id = selectedId)
            );
            req.session.selectedTransactionId = selectedId;
            res.render("transaction", {
                transactions,
                user,
                selectedTransaction,
            });
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.insertTransaction = async (req, res) => {
    const productId1 = new ObjectId(req.body["productId1"]);
    const productId2 = new ObjectId(req.body["productId2"]);
    const products1 = await productModel.findById(productId1);
    const products2 = await productModel.findById(productId2);
    const newTransaction = new transactionModel({
        user1: products1.owner,
        user2: products2.owner,
        products1: [productId1],
        products2: [productId2],
        status: "active",
    });
    newTransaction
        .save()
        .then((transaction) => {
            res.status(201).send({
                message: "Transaction created successfully",
                data: transaction,
            });
            new transactionDetailModel({
                transactionId: transaction._id,
                startDate: Date.now(),
                endDate: null,
                rating1: null,
                rating2: null,
                review1: "",
                review2: "",
            }).save();
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.updateTransaction = (req, res) => {
    const transactionId = req.params.id;
    const updateTransaction = req.body;
    transactionModel
        .findByIdAndUpdate(transactionId, updateTransaction, { new: true })
        .then((transaction) => {
            res.status(200).send(transaction);
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.deleteTransaction = (req, res) => {
    const transactionId = new ObjectId(req.params.id);
    transactionModel
        .deleteOne({ _id: transactionId })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

function compareTransactionByStatus(transaction1, transaction2) {
    // TODO: create TransactionStatus schema in the future
    const statusEnum = {
        active: 0,
        pending: 1,
        finished: 2,
        interrupted: 3,
    };

    const status1 = transaction1.status;
    const status2 = transaction2.status;
    if (!(status1 in statusEnum) || !(status2 in statusEnum)) {
        return -1;
    }
    return statusEnum[status1] < statusEnum[status2];
}
