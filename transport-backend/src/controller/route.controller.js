const Route = require("../model/route.model");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

//Register a Route | guest
const createRoute = async (req, res) => {
    if (req.body) {
        await Route.findOne({ routeName: req.body.routeName }, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (!result) {
                            const route = new Route(req.body);
                            await route.save()
                                .then(data => {
                                    console.log(data);
                                    res.status(200).send(data);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.send(err);
                                });
                        
                } else {
                    console.log("Route Already Exist");
                    res.send({ message: "Route Already Exist" });
                }
            }
        });
    }
}

//update Route Details
const updateRoute = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;
       
            updateDetails(id, req, (err, route) => {
                if (err) return res.status(500).send(err);
                console.log("route");
                console.log(route);
                res.status(200).send(route);
            })
    }
}

function updateDetails(id, req, callback) {
    Route.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            Route.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var route = result;
                    console.log(route);
                    return callback(null, route);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All Route
const getAllRoute = async (req, res) => {
    await Route.find()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//get Route By Route Name
const getRouteByRouteName = async (req, res) => {
    await Route.findOne({routeName:req.body.routeName})
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}

//delete Route
const deleteRoute = async (req, res) => {
    if (req.body.id) {
        await Route.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createRoute,
    updateRoute,
    deleteRoute,
    getAllRoute,
    getRouteByRouteName
}