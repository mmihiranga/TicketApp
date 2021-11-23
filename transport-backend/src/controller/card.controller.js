const Card = require("../model/card.model");
const User = require("../model/user.model");

//Register a Card | guest
const createCard = async (req, res) => {
    if (req.body) {
        await Card.findOne({ cardNumber: req.body.cardNumber }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {
                    await User.findOne({ _id: req.body.userId }, async (err, newResult) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (newResult) {
                                        const card = new Card(req.body);
                                        await card.save()
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
                        
                } else {
                    console.log("Card Already Exist");
                    res.send({ message: "Card Already Exist" });
                }
            }
        });
    }
}

//update Card Details
const updateCard = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
       
            updateDetails(id, req, (err, card) => {
                if (err) return res.status(500).send(err);
                console.log("card");
                console.log(card);
                res.status(200).send(card);
            })
    }
}

function updateDetails(id, req, callback) {
    Card.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Card.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var card = result;
                    console.log(card);
                    return callback(null, card);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Card
const getAllCard = async (req, res) => {
    await Card.find().populate('userId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//get All Card By User Id
const getAllCardByUserId = async (req, res) => {
    await Card.find({ userId: req.body.userId }).populate('userId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Card
const deleteCard = async (req, res) => {
    if (req.body.id) {
        await Card.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createCard,
    updateCard,
    getAllCardByUserId,
    deleteCard,
    getAllCard
}