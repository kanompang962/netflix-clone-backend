const Movie = require("../models/Movie")

// read movies
exports.movieBillboard = (req, res) => {
    Movie.findOne({}).exec((err, data) => {
        res.json(data);
    })
};

// read movies
exports.read = (req, res) => {
    Movie.find({}).exec((err, data) => {
        res.json(data);
    })
};
// read movies single
exports.readSingle = (req, res) => {
    const { id } = req.params
    Movie.findOne({
        _id: id
    }).exec((err, data) => {
        res.json(data);
    })
};

