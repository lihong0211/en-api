const sqlConfig = {
  insert:
    'INSERT INTO `check` (platform, patientSex, patientAge, primaryDiagnosis, medicines, pass, params, error, isNotMatch, doctor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
};
module.exports = sqlConfig;
