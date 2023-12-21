var root = {
  //增
  rootInsert:
    'INSERT INTO root (id, name, meaning, similar, cases) VALUES(0,?,?,?,?)',
  //删
  rootDelete: 'delete from root where id=?',
  //改
  rootUpdate:
    'UPDATE root SET name=?, meaning=?, similar=?, cases=? WHERE id=?',
  //查
  rootList: 'select * from root',
};

module.exports = root;
