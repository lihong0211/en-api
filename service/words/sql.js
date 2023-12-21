var words = {
  //增
  wordInsert:
    'INSERT INTO words (id, word, type, meaning, root, root_case, affix, affix_case, collocation, collocation_meaning, sentence, mastered) VALUES(0,?,?,?,?,?,?,?,?,?,?,?)',
  //删
  wordDelete: 'delete from words where id=?',
  //改
  wordUpdate:
    'UPDATE words SET word=?, type=?, meaning=?, root=?, root_case=?, affix=?, affix_case=?, collocation=?, collocation_meaning=?, sentence=?, mastered=? WHERE id=?',
  //查
  wordList: 'select * from words',

  count: 'select count(1) from words where word=?',
};

module.exports = words;
