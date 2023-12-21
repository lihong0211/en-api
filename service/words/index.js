const { limit } = require('../../utils');

//实现与mysql交互
var mysql = require('mysql2/promise');
var $conf = require('../../config/db.js');
var $util = require('../../utils/index.js');
var $sql = require('./sql.js');

//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  //增加单词
  add: function (req, res) {
    const {
      word,
      type,
      meaning,
      root,
      root_case,
      affix,
      affix_case,
      collocation,
      collocation_meaning,
      sentence,
      mastered,
    } = req.body;
    if (!word || !meaning) {
      return res.json({
        code: 500,
        msg: 'word or meaning is empty',
      });
    }
    pool.getConnection().then(async (conn) => {
      const result = await conn.query($sql.count, [word]);
      if (result[0][0]['count(1)']) {
        conn.release();
        return res.json({
          code: 500,
          msg: '单词已存在',
        });
      } else {
        conn
          .query($sql.wordInsert, [
            word,
            type?.join(','),
            meaning,
            root,
            root_case,
            affix,
            affix_case,
            collocation,
            collocation_meaning,
            sentence,
            mastered,
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
      }
    });
  },
  delete: function (req, res) {
    const { id } = req.body;
    pool.getConnection().then((connection) => {
      connection
        .query($sql.wordDelete, [id])
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
  update: function (req, res) {
    const {
      word,
      type,
      meaning,
      root,
      root_case,
      affix,
      affix_case,
      collocation,
      collocation_meaning,
      sentence,
      mastered,
      id,
    } = req.body;
    pool.getConnection().then((connection) => {
      connection
        .query($sql.wordUpdate, [
          word,
          type?.join(','),
          meaning,
          root,
          root_case,
          affix,
          affix_case,
          collocation,
          collocation_meaning,
          sentence,
          mastered,
          id,
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
    });
  },
  list: function (req, res) {
    const { page, size, query } = req.body;
    console.log(page, size);
    const listSql = limit('words', page, size, query);

    pool.getConnection().then(async (connection) => {
      const result = await connection.query('select count(1) from words');
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
                  mastered: item.mastered || 0,
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
