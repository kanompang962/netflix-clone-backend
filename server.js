const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// routing
const movieRoute = require('./routers/movie');
const authRoute = require('./routers/auth');


require("dotenv").config();

const app = express();

// connect database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
}).then(() => {
    console.log('connect to database successfully')
    // Movie.find().then((movie) => console.log(movie))
})
    .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api', movieRoute);
app.use('/api', authRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server listening on port ' + port));