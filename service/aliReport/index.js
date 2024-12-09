//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../config/db.pdd.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');
const { limit } = require('../../utils/index.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  add: function (req, res) {
    const { uid, query, pass, reason } = req.body;
    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.insert, [uid, query, pass, reason])
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
    });
  },
};
