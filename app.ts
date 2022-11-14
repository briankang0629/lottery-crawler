const express = require('express')
const app = express();

require('dotenv').config()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!');
})

const Lottery = require('./routes/lottery')

app.use('/lottery', Lottery)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next({
        status: 404,
        message: 'not found.'
    })
})

// error handler
app.use(function(err, req, res, next) {
    console.log(err)
    return res.status(err.status || 200).send({
        message: err.message
    })
})

app.listen(3000)
module.exports = app
