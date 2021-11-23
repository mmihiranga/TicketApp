const TimeTable = require("../model/timeTable.model");
const Route = require("../model/route.model");
const Bus = require("../model/bus.model");

//Register a TimeTable | guest
const createTimeTable = async (req, res) => {
    if (req.body) {
        await Route.findOne({ _id: req.body.routeId }, async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    await Bus.findOne({ _id: req.body.busId }, async (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (data) {
                                const timeTable = new TimeTable(req.body);
                                await timeTable.save()
                                    .then(data => {
                                        console.log(data);
                                        res.status(200).send(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.send(err);
                                    });
                            } else {
                                console.log("Bus Not Exist");
                                res.send({ message: "Bus Not Exist" });
                            }
                        }
                    });
                } else {
                    console.log("Route Not Exist");
                    res.send({ message: "Route Not Exist" });
                }
            }
        });
    }
}

//update TimeTable Details
const updateTimeTable = async (req, res) => {
    if (req.body) {
        if (!req.body.id) return res.status(500).send("Id is missing");
        let id = req.body.id;

        updateDetails(id, req, (err, timeTable) => {
            if (err) return res.status(500).send(err);
            console.log("timeTable");
            console.log(timeTable);
            res.status(200).send(timeTable);
        })
    }
}


function updateDetails(id, req, callback) {
    TimeTable.findByIdAndUpdate(id, req.body)
        .then((result2) => {
            TimeTable.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var timeTable = result;
                    console.log(timeTable);
                    return callback(null, timeTable);
                }
            });

        })
        .catch(err => {
            console.log(err)
            return callback(err);

        })
}

//get All TimeTable
const getAllTimeTable = async (req, res) => {
    await TimeTable.find().populate('routeId').populate('busId')
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}


//get All TimeTable By From And To
const getAllTimeTableByFromTo = async (req, res) => {
    console.log('Start')
    console.log(req.body.from)
    await TimeTable.aggregate([
        {
            "$lookup": {
                "from": "routes",
                "localField": "routeId",
                "foreignField": "_id",
                "as": "routeId"
            }
        },
        {
            "$lookup": {
                "from": "buses",
                "localField": "busId",
                "foreignField": "_id",
                "as": "busId"
            }
        },
        {
            "$match": {
                "routeId.from": req.body.from,
                "routeId.to": req.body.to,
            }
        }
    ])
        .then((data) => {
            data.forEach(element => {
                element.busId = element.busId[0];
                element.routeId = element.routeId[0];
            })
            console.log(data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
}


//delete TimeTable
const deleteTimeTable = async (req, res) => {
    if (req.body.id) {
        await TimeTable.findByIdAndDelete(req.body.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createTimeTable,
    updateTimeTable,
    getAllTimeTableByFromTo,
    deleteTimeTable,
    getAllTimeTable
}