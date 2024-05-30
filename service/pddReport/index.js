//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../config/db.pdd.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');
const { limit } = require('../../utils');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  addChat: function (req, res) {
    const { sessionid, req_content, res_content, cost, start_time, end_time } =
      req.body;
    pool.query(
      $sql.chat.insert,
      [
        sessionid,
        JSON.stringify(req_content),
        JSON.stringify(res_content),
        cost,
        String(start_time),
        String(end_time),
      ],
      (err) => {
        if (err) {
          return res.json({
            code: 500,
            msg: err.message,
          });
        }
        return res.json({
          code: 200,
          msg: 'success',
        });
      }
    );
  },
  listChat: function (req, res) {
    const { page, size, query } = req.body;
    const listSql = limit('chat', page, size, query);

    pool.getConnection().then(async (connection) => {
      const result = await connection.query('select count(1) from chat');
      const total = result[0][0]['count(1)'];
      connection
        .query(listSql)
        .then((result) => {
          return res.json({
            code: 200,
            data: {
              data: result[0].map((item) => {
                return {
                  ...item,
                };
              }),
              total,
              page,
            },
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            msg: err.message,
          });
        });
      connection.release();
    });
  },

  addRp: function (req, res) {
    const { sessionid, name, sex, age, diagnosis, medicine, dosage } = req.body;
    pool.query(
      $sql.rp.insert,
      [sessionid, name, sex, age, diagnosis, medicine, dosage],
      (err) => {
        if (err) {
          return res.json({
            code: 500,
            msg: err.message,
          });
        }
        return res.json({
          code: 200,
          msg: 'success',
        });
      }
    );
  },
  listRp: function (req, res) {
    const { page, size, query } = req.body;
    const listSql = limit('rp', page, size, query);
    console.log(listSql);
    pool.getConnection().then(async (connection) => {
      const result = await connection.query('select count(1) from rp');
      const total = result[0][0]['count(1)'];
      connection
        .query(listSql)
        .then((result) => {
          return res.json({
            code: 200,
            data: {
              data: result[0].map((item) => {
                return {
                  ...item,
                };
              }),
              total,
              page,
            },
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            msg: err.message,
          });
        });
      connection.release();
    });
  },
};
