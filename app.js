const express = require('express')
const app = express();

require('dotenv').config()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!');
})

// 539
const FiveThreeNine = require('./routes/FiveThreeNine');

// 大樂透
const TaiwanBigLottery = require('./routes/TaiwanBigLottery');

// 威力彩
const PowerLottery = require('./routes/PowerLottery');

app.use('/lottery/539', FiveThreeNine)
app.use('/lottery/taiwan_big_lottery', TaiwanBigLottery)
app.use('/lottery/power_lottery', PowerLottery)

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
