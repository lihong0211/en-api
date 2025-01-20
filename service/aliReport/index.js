//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../config/db.pdd.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  add: function (req, res) {
    const {
      createAt,
      patientSex,
      patientAge,
      primaryDiagnosis,
      illDesc,
      sicknessDetail,
      medicines,
      pass,
      reason,
      query,
      refuse,
      rpID,
    } = req.body;

    pool.getConnection().then(async (connection) => {
      try {
        if (refuse) {
          connection
            .query(
              'UPDATE ali_rp_check SET refuse = refuse + 1 WHERE rpID = ?',
              [rpID]
            )
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
        } else {
          connection
            .query($sql.insert, [
              createAt,
              patientSex,
              patientAge,
              primaryDiagnosis,
              illDesc,
              sicknessDetail,
              medicines,
              pass,
              reason,
              query,
            ])
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
        }
      } catch (e) {
        console.log(e);
      }
    });
  },
  get: function (req, res) {
    const { rpID } = req.query; // 从查询参数中获取 rpID

    if (!rpID) {
      return res.json({
        code: 400,
        msg: 'Missing rpID parameter',
      });
    }

    pool
      .getConnection()
      .then(async (connection) => {
        try {
          const [rows] = await connection.query(
            'SELECT refuse FROM ali_rp_check WHERE rpID = ?',
            [rpID]
          );

          connection.release(); // 释放连接

          if (rows.length === 0) {
            return res.json({
              code: 404,
              msg: 'Record not found',
            });
          }

          return res.json({
            code: 200,
            msg: 'success',
            data: rows[0], // 返回查询结果中的第一条数据
          });
        } catch (err) {
          connection.release(); // 出现异常时也要释放连接
          return res.json({
            code: 500,
            msg: err.message,
          });
        }
      })
      .catch((err) => {
        return res.json({
          code: 500,
          msg: `Connection error: ${err.message}`,
        });
      });
  },

  update: function (req, res) {
    const { rpID } = req.body;
    pool.getConnection().then(async (connection) => {
      try {
        connection
          .query('UPDATE ali_rp_check SET refuse = refuse + 1 WHERE rpID = ?', [
            rpID,
          ])
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
};
