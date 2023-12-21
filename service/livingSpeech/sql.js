var livingSpeech = {
  //增
  insert: 'INSERT INTO livingSpeech (id, speech, meaning) VALUES(0,?,?)',
  //删
  delete: 'delete from livingSpeech where id=?',
  //改
  update: 'UPDATE livingSpeech SET speech=?, meaning=? WHERE id=?',
  //查
  list: 'select * from livingSpeech',
};

module.exports = livingSpeech;
