const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/e-comm")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error', err));
