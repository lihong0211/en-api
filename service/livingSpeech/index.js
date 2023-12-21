const { limit } = require('../../utils');

var mysql = require('mysql2/promise');
var $conf = require('../../config/db.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  //增加用语
  add: function (req, res) {
    const { speech, meaning } = req.body;
    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.insert, [speech, meaning])
        .then(() => {
          return res.json({
            code: 200,
            msg: 'success',
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            msg: err.message,
          });
        });
    });
  },
  delete: function (req, res) {
    const { id } = req.body;
    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.delete, [id])
        .then(() => {
          return res.json({
            code: 200,
            msg: 'success',
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            msg: err.message,
          });
        });
    });
  },
  update: function (req, res) {
    const { speech, meaning, id } = req.body;
    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.update, [speech, meaning, id])
        .then(() => {
          return res.json({
            code: 200,
            msg: 'success',
          });
        })
        .catch((err) => {
          return res.json({
            code: 500,
            msg: err.message,
          });
        });
    });
  },
  list: function (req, res) {
    pool.query($sql.list, (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          msg: err.message,
        });
      }
      return res.json({
        code: 200,
        data: {
          data: result,
          total: result.length,
          page: req?.page || 1,
        },
        msg: 'success',
      });
    });
  },
  list: function (req, res) {
    const { page, size, query } = req.body;
    const listSql = limit('livingSpeech', page, size, query);

    pool.getConnection().then(async (connection) => {
      const result = await connection.query(
        'select count(1) from livingSpeech'
      );
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
                  type: item.type?.split(','),
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
