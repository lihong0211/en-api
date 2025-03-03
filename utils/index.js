module.exports = {
  extend: function (target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key))
        flag
          ? (target[key] = source[key])
          : target[key] === void 0 && (target[key] = source[key]);
    }
    return target;
  },
  /**
   * 生成分页查询sql
   * @param {string} table 表名
   * @param {number} pageNum 分页页数
   * @param {number} pageSize 分页条数
   * @param {object} query 查询对象 例：{id:1,name:'小明'}
   * @returns sql语句
   */
  limit: function (table, pageNum, pageSize, query) {
    let sql = `WHERE `;
    let keyList = Object.keys(query || {}); // 提取查询对象中的key为数组
    //查询对象全为空则结束函数
    if (!keyList.some((e) => query[e])) {
      //如果查询对象中得value都为空的话查询条件为空
      sql = '';
    } else {
      //生成SQL语句
      keyList.forEach((e, index) => {
        //判断下一个分页条件是否为空，如果不为空则拼接AND
        let context = query[keyList[index + 1]] ? ' AND ' : '';
        //value不为空时，拼接筛选条件
        if (query[e]) {
          sql += `${e} like '%${query[e]}%'${context} `; //拼接sql
        }
      });
    }
    console.log(
      `SELECT * FROM ${table} ${sql}LIMIT ${
        (pageNum - 1) * pageSize
      },${pageSize}`
    );
    return `SELECT * FROM ${table} ${sql}LIMIT ${
      (pageNum - 1) * pageSize
    },${pageSize}`;
  },
};
