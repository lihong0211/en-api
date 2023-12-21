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
    const { dialogue, meaning, words, section } = req.body;
    pool.query(
      $sql.dialogueInsert,
      [JSON.stringify(dialogue), meaning, JSON.stringify(words), section],
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
    pool.query($sql.dialogueDelete, id, (err) => {
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
    const { dialogue, meaning, words, section, id } = req.body;

    pool.query(
      $sql.dialogueUpdate,
      [JSON.stringify(dialogue), meaning, JSON.stringify(words), section, id],
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
    pool.query($sql.dialogueList, (err, result) => {
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
              words: tryJsonParse(item.words),
              dialogue: tryJsonParse(item.dialogue),
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
