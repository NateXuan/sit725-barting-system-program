const ObjectId = require("mongodb").ObjectId;
const transactionDetailModel = require("../models/transactionDetail");

exports.getTransactionDetail = (req, res) => {
    const transactionId = new ObjectId(req.query?.transactionId);
    transactionDetailModel
        .find({ transactionId })
        .then((transactionDetail) => {
            res.status(200).send(transactionDetail);
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.insertTransactionDetail = async (req, res) => {
    const newTransactionDetail = new transactionDetailModel(req.body);
    newTransactionDetail
        .save()
        .then((transactionDetail) => {
            res.status(201).send({
                message: "Transaction detail created successfully",
                data: transactionDetail,
            });
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.updateTransactionDetail = (req, res) => {
    const transactionId = req.query["transactionId"];
    const updateTransactionDetail = req.body;
    transactionDetailModel
        .findOneAndUpdate({ transactionId }, updateTransactionDetail, {
            new: true,
        })
        .then((transactionDetail) => {
            res.status(200).send(transactionDetail);
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};

exports.deleteTransactionDetail = (req, res) => {
    const transactionId = new ObjectId(req.params.id);
    transactionDetailModel
        .deleteOne({ transactionId })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err });
        });
};
