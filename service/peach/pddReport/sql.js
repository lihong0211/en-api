const sqlConfig = {
  rp: {
    insert:
      'INSERT INTO rp (sessionid, name, age, sex, pddDiagnosis, recommendDiagnosis, medicine, dosage, time) VALUES(?,?,?,?,?,?,?,?,?)',
    list: 'select * from rp',
  },
  chat: {
    insert:
      'INSERT INTO chat (sessionid, req_content, res_content, cost, start_time, end_time) VALUES(?,?,?,?,?,?)',
    list: 'select * from chat',
  },
  manual: {
    insert:
      'INSERT INTO manual (sessionid,type, time, session_data) VALUES(?,?,?,?)',
    list: 'select * from manual',
  },
};

module.exports = sqlConfig;
