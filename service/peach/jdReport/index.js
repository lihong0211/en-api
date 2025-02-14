//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../../config/db.pdd.js');
var $util = require('../../../utils/index.js');
var $sql = require('./sql.js');
const { limit } = require('../../../utils/index.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  addVersion: function (req, res) {
    const { version, name, platform } = req.body;
    pool.getConnection().then(async (connection) => {
      try {
        connection
          .query($sql.insert, [version, name, platform])
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
        connection.release();
      } catch (e) {
        console.log(e);
      }
    });
  },
  listVersion: function (req, res) {
    const { page, size, query } = req.body;
    const listSql = limit('version', page, size, query);

    pool.getConnection().then(async (connection) => {
      const result = await connection.query('select count(1) from version');
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
