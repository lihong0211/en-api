var affix = {
  //增
  affixInsert:
    'INSERT INTO affix (id, name, meaning, similar, cases) VALUES(0,?,?,?,?)',
  //删
  affixDelete: 'delete from affix where id=?',
  //改
  affixUpdate:
    'UPDATE affix SET name=?, meaning=?, similar=?, cases=? WHERE id=?',
  //查
  affixList: 'select * from affix',
};

module.exports = affix;
