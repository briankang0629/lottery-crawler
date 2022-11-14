const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const cheerio = require('cheerio');
const axios = require('axios');

dayjs.extend(utc)
dayjs.extend(timezone)

const TAIWAN_LOTTERY_URL = 'https://www.pilio.idv.tw/';
const FIVE_THREE_NINE_URL = 'lto539/list.asp';

exports.fiveThreeNine = async (req, res, next) => {
    let page = 1;

    const rs = await axios.get(TAIWAN_LOTTERY_URL + FIVE_THREE_NINE_URL);
    const DOM = rs.data;
    const $ = cheerio.load(DOM);
    const totalPage = $('select[name="indexpage"] option').length - 1;

    let lottery: object = {};

    while (page <= totalPage) {
        const rs = await axios.get(TAIWAN_LOTTERY_URL + FIVE_THREE_NINE_URL + '?indexpage=' + page);
        const DOM = rs.data;
        const $ = cheerio.load(DOM);

        $('table.auto-style1 tr').each((i, element) => {
            if (i < 1) {
                return;
            }
            let content = $(element).text().trim();
            lottery[content.substr(0, 10)] = content.substr(-18, 18).split(', ');
        });
        page ++;
    }

    return res.send({
        status: 200,
        message: "OK",
        data: lottery
    });
}

function crawler() {

}
