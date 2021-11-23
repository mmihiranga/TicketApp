const Payment = require("../model/payment.model");
const User = require("../model/user.model");

//Register a Payment | guest
const createPayment = async (req, res) => {
    if (req.body) {
        await User.findOne({ _id: req.body.userId }, async (err, newResult) => {
            if (err) {
                console.log(err);
            } else {
                if (newResult) {
                    const payment = new Payment(req.body);
                    await payment.save()
                        .then(data => {
                            console.log(data);
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            console.log(err);
                            res.send(err);
                        });

                } else {
                    console.log("User Not Exist");
                    res.send({ message: "User Not Exist" });
                }
            }
        });

    }
}

//update Payment Details
const updatePayment = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;

        updateDetails(id, req, (err, payment) => {
            if (err) return res.status(500).send(err);
            console.log("payment");
            console.log(payment);
            res.status(200).send(payment);
        })
    }
}

function updateDetails(id, req, callback) {
    Payment.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Payment.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var payment = result;
                    console.log(payment);
                    return callback(null, payment);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Payment
const getAllPayment = async (req, res) => {
    await Payment.find().populate('userId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//get All Payment By User Id
const getAllPaymentByUserId = async (req, res) => {
    await Payment.findById(req.body._id).populate('userId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}
//get All Payment
const getAllPaymentGroupByDate = async (req, res) => {
    await Payment.aggregate(
        [{
            "$group": {
                "_id": "$date",
                "totalAmount": {"$sum": "$amount"}
            }
        },{
            "$sort": {"_id": 1}
        },{
            "$limit": 31
        }]
    )
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Payment
const deletePayment = async (req, res) => {
    if (req.body.id) {
        await Payment.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createPayment,
    updatePayment,
    getAllPaymentByUserId,
    deletePayment,
    getAllPayment,
    getAllPaymentGroupByDate
}