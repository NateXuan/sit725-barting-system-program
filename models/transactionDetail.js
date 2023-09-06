const mongoose = require("mongoose");

const transactionDetailSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
    },

    startDate: {
        type: Date,
        required: true,
    },

    location: String,

    endDate: Date,

    rating1: Number,

    rating2: Number,

    review1: String,

    review2: String,
});

const TransactionDetail = mongoose.model(
    "transaction_detail",
    transactionDetailSchema
);

module.exports = TransactionDetail;
