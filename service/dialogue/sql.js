var dialogue = {
  //增
  dialogueInsert:
    'INSERT INTO dialogue (id, dialogue, meaning, words, section) VALUES(0,?,?,?,?)',
  //删
  dialogueDelete: 'delete from dialogue where id=?',
  //改
  dialogueUpdate:
    'UPDATE dialogue SET dialogue=?, meaning=?, words=?, section=? WHERE id=?',
  //查
  dialogueList: 'select * from dialogue',
};

module.exports = dialogue;
