//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../../config/db.pdd.js');
var $util = require('../../../utils/index.js');
var $sql = require('./sql.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  add: function (req, res) {
    const { userName, platform, pluginVersion, status } = req.body;
    pool.getConnection().then(async (connection) => {
      try {
        // await connection.beginTransaction();
        connection
          .query($sql.update, [userName])
          .then(() => {
            if (status === 'offline')
              return res.json({
                code: 200,
                msg: 'success',
              });
          })
          .catch((err) => {
            console.error(err);
          });

        if (status === 'online') {
          connection
            .query($sql.insert, [userName, platform, pluginVersion, status])
            .then(() => {
              return res.json({
                code: 200,
                msg: 'success',
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } catch (error) {
        // await connection.rollback();
        console.error('数据库操作失败:', error);
      } finally {
        connection.release();
      }
    });
  },
  list: function (req, res) {
    const { platform, userName, startTime, endTime } = req.body;

    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.list, [platform, userName, startTime, endTime])
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
  detail: function (req, res) {
    const { platform, userName, startTime, endTime } = req.body;

    pool.getConnection().then(async (connection) => {
      connection
        .query($sql.detail, [platform, userName, startTime, endTime])
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
