const cheerio = require('cheerio');
const axios = require('axios');

const TAIWAN_LOTTERY_URL = 'https://www.pilio.idv.tw/';
const BIG_LOTTERY_URL = 'ltobig/ServerE/list.asp';

/**
 * History 歷史紀錄
 * @param req
 * @param res
 * @param next
 */
exports.history = async (req, res, next) => {
    let page = 1;

    const rs = await axios.get(TAIWAN_LOTTERY_URL + BIG_LOTTERY_URL);
    const DOM = rs.data;
    const $ = cheerio.load(DOM);
    const totalPage = $('select[name="indexpage"] option').length - 1;

    let lottery = {};

    while (page <= totalPage) {
        const rs = await axios.get(TAIWAN_LOTTERY_URL + BIG_LOTTERY_URL + '?indexpage=' + page);
        const DOM = rs.data;
        const $ = cheerio.load(DOM);

        $('table.auto-style1 tr').each((i, element) => {
            if (i < 1) {
                return;
            }
            let content = $(element).text().trim();
            lottery[content.substr(0, 10)] = content.substr(-74, 22).split(', ');
            lottery[content.substr(0, 10)].push(content.substr(-2, 2));
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
    let lottery = {
        date: "",
        number: []
    };
    const rs = await axios.get(TAIWAN_LOTTERY_URL + BIG_LOTTERY_URL);
    const DOM = rs.data;
    const $ = cheerio.load(DOM);

    $('table.auto-style1:first tr:nth-child(2) td').each((i, element) => {
        let content = $(element).text().trim();
        if (i === 0) {
            lottery['date'] = content.substr(0, 10);
        } else if (i === 1) {
            lottery['number'] = (content.substr(-24, 22).split(', '));
        } else {
            lottery['number'].push(content.substr(-2, 2));
        }
    });

    return res.send({
        status: 200,
        message: "OK",
        data: lottery
    });
}
