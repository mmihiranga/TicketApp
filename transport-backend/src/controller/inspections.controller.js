const Inspections = require("../model/inspections.model");

//Create a Inspection
const createInspections = async (req, res) => {
  if (req.body) {
    const data = {
      passengerCount: req.body.passengerCount,
      paidPCount: req.body.paidPCount,
      unpaidPCount: req.body.unpaidPCount,
      busNo: req.body.busNo,
      route: req.body.route,
      remarks: req.body.remarks,
    };
    const inspections = new Inspections(data);

    await inspections
      .save()
      .then((data) => res.status(200).send({ data: data }))
      .catch((err) => res.send(err));
  }
};
//get All inspections
const getAllInspections = async (req, res) => {
  await Inspections.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = {
  createInspections,
  getAllInspections,
};
