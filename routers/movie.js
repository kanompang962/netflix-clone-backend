const express = require('express');
const router = express.Router();

const { read, readSingle, movieBillboard } = require('../controllers/movieController');


router.get('/movie-billboard', movieBillboard);
router.get('/movie/:id', readSingle);
router.get('/movies', read);


module.exports = router;