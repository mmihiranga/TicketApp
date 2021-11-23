const Bus = require("../model/bus.model");
const Route = require("../model/route.model");
const bcrypt = require("bcryptjs");
const Payment = require("../model/payment.model");
const saltRounds = 5;

//Register a Bus | guest
const createBus = async (req, res) => {
    if (req.body) {
        await Bus.findOne({ busNumber: req.body.busNumber }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {
                    await Route.findOne({ _id: req.body.routeId }, async (err, data) => {

                        if (err) {
                            console.log(err);
                        } else {
                            if (data) {
                                const bus = new Bus(req.body);
                                await bus.save()
                                    .then(data => {
                                        console.log(data);
                                        res.status(200).send(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.send(err);
                                    });
                            } else {
                                console.log("Route Not Exist");
                                res.send({ message: "Route Not Exist" });
                            }
                        }
                    });
                } else {
                    console.log("Bus Already Exist");
                    res.send({ message: "Bus Already Exist" });
                }
            }
        });
    }
}

//update Bus Details
const updateBus = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;

        updateDetails(id, req, (err, bus) => {
            if (err) return res.status(500).send(err);
            console.log("bus");
            console.log(bus);
            res.status(200).send(bus);
        })
    }
}

function updateDetails(id, req, callback) {
    Bus.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Bus.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var bus = result;
                    console.log(bus);
                    return callback(null, bus);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Bus
const getAllBus = async (req, res) => {
    await Bus.find().populate('routeId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Bus
const deleteBus = async (req, res) => {
    if (req.body.id) {
        await Bus.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

//get Bus By Bus Number
const getBusByBusNumber = async (req, res) => {
    await Bus.findOne({busNumber:req.body.busNumber}).populate('routeId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

const getAllBusGroupByRoute = async (req, res) => {
    await Bus.aggregate(
        [ {
            "$lookup": {
                "from": "routes",
                "localField": "routeId",
                "foreignField": "_id",
                "as": "routeId"
            }
        },{
            "$group": {
                "_id": "$routeId.routeName",
                "busCount": {"$sum": 1}
            }
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

module.exports = {
    createBus,
    updateBus,
    deleteBus,
    getAllBus,
    getBusByBusNumber,
    getAllBusGroupByRoute
}