//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../../config/db.pdd.js');
var $util = require('../../../utils/index.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  listConfig: function (req, res) {
    pool.getConnection().then(async (connection) => {
      connection
        .query('select * from plugin_config')
        .then((result) => {
          return res.json({
            code: 200,
            data: {
              data: result[0],
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
