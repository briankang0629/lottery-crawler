const cheerio = require('cheerio');
const axios = require('axios');

const TAIWAN_LOTTERY_URL = 'https://www.pilio.idv.tw/';
const FIVE_THREE_NINE_URL = 'lto539/list.asp';

/**
 * History 歷史紀錄
 * @param req
 * @param res
 * @param next
 */
exports.history = async (req, res, next) => {
    let page = 1;

    const rs = await axios.get(TAIWAN_LOTTERY_URL + FIVE_THREE_NINE_URL);
    const DOM = rs.data;
    const $ = cheerio.load(DOM);
    const totalPage = $('select[name="indexpage"] option').length - 1;

    let lottery = {};

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

/**
 * Latest 最新開獎號碼
 * @param req
 * @param res
 * @param next
 */
exports.latest = async (req, res, next) => {
    let lottery = {};
    const rs = await axios.get(TAIWAN_LOTTERY_URL + FIVE_THREE_NINE_URL);
    const DOM = rs.data;
    const $ = cheerio.load(DOM);

    $('table.auto-style1:first tr:nth-child(2) td').each((i, element) => {
        let content = $(element).text().trim();
        if (i < 1) {
            lottery['date'] = content.substr(0, 10);
        } else {
            lottery['number'] = content.substr(-18, 18).split(', ');
        }
    });

    return res.send({
        status: 200,
        message: "OK",
        data: lottery
    });
}
