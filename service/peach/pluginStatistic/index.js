//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../../config/db.pdd.js');
var $util = require('../../../utils/index.js');
var $sql = require('./sql.js');
var $sqlVersion = require('../version/sql.js');
const dayjs = require('dayjs');
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
        connection.query($sqlVersion.insert, [
          pluginVersion,
          userName,
          platform,
        ]);

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
    const today = dayjs().format('YYYY-MM-DD');
    const {
      platform,
      userName,
      startTime = `${today} 00:00:00`,
      endTime = `${today} 23:59:59`,
    } = req.body;

    pool.getConnection().then(async (connection) => {
      let sql = `SELECT
                    user_name,
                    platform,
                    plugin_version,
                    DATE_FORMAT(login_time, '%Y-%m-%d') AS date,
                    SUM(TIMESTAMPDIFF(SECOND, login_time, logout_time)) AS seconds,
                    SEC_TO_TIME(SUM(TIMESTAMPDIFF(SECOND, login_time, logout_time))) AS hms
                FROM plugin_statistic
                WHERE login_time BETWEEN ? AND ?
                AND logout_time IS NOT NULL`;

      const params = [startTime, endTime]; // 先添加必须的时间参数

      if (platform) {
        sql += ' AND platform = ?';
        params.push(platform);
      }

      if (userName) {
        sql += ' AND user_name = ?';
        params.push(userName);
      }

      sql += ` GROUP BY DATE_FORMAT(login_time, '%Y-%m-%d'), user_name, platform, plugin_version
             ORDER BY date`;
      connection
        .query(sql, params)
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
