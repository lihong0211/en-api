const sqlConfig = {
  insert: `INSERT INTO check (platform, patientSex, patientAge, primaryDiagnosis, medicines, pass, params, error) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
};
module.exports = sqlConfig;
