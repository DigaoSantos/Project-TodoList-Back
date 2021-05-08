const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo';
mongoose.connect(url, { 
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
})

module.exports = mongoose;