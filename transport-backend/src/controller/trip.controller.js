const Trip = require("../model/trip.model");

//add Trip  Details
const createTrip = async (req, res) => {
  if (req.body) {
    const trip = new Trip(req.body);

    await trip
      .save()
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
};

//update Trip  Details
const updateTrip = async (req, res) => {
  if (req.body) {
    if (!req.body.id) return res.status(500).send("Id is missing");
    let id = req.body.id;

    updateDetails(id, req, (err, trip) => {
      if (err) return res.status(500).send(err);
      console.log("trip");
      console.log(trip);
      res.status(200).send(trip);
    });
  }
};

function updateDetails(id, req, callback) {
  Trip.findByIdAndUpdate(id, req.body)
    .then(() => {
      Trip.findOne({ _id: id }, (err, result) => {
        if (err) {
          console.log(err);
          return callback(err);
        } else {
          var trip = result;
          console.log(trip);
          return callback(null, trip);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return callback(err);
    });
}

//get All Trip
const getAllTrip = async (req, res) => {
  await Trip.find()
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

//get User by ID
const getTripById = async (req, res) => {
  await Trip.find({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
};

//delete Trip
const deleteTrip = async (req, res) => {
  if (req.body.id) {
    await Trip.findByIdAndDelete(req.body.id, (err, result) => {
      if (err) return res.status(500).send(err);
      console.log(result);
      return res.status(200).send(result);
    });
  }
};

module.exports = {
  createTrip,
  updateTrip,
  deleteTrip,
  getAllTrip,
  getTripById,
};
