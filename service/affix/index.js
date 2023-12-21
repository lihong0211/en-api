//实现与mysql交互
var mysql = require('mysql2');
var $conf = require('../../config/db.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');
//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

const tryJsonParse = (data) => {
  let res;
  try {
    res = JSON.parse(data);
  } catch {
    res = [];
  }
  return res;
};

module.exports = {
  //增加单词
  add: function (req, res) {
    const { name, meaning, similar, cases } = req.body;
    pool.query(
      $sql.affixInsert,
      [name, meaning, similar?.join(','), JSON.stringify(cases)],
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
  delete: function (req, res) {
    const { id } = req.body;
    pool.query($sql.affixDelete, id, (err) => {
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
    });
  },
  update: function (req, res, next) {
    const { name, meaning, similar, cases, id } = req.body;

    pool.query(
      $sql.affixUpdate,
      [name, meaning, similar?.join(','), JSON.stringify(cases), id],
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
  list: function (req, res, next) {
    pool.query($sql.affixList, (err, result) => {
      if (err) {
        return res.json({
          code: 500,
          msg: err.message,
        });
      }
      return res.json({
        code: 200,
        data: {
          data: result.map((item) => {
            return {
              ...item,
              similar: item.similar?.split(',') || [],
              cases: tryJsonParse(item.cases),
            };
          }),
          total: result.length,
          page: req?.page || 1,
        },
        msg: 'success',
      });
    });
  },
};
