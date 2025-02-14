const sqlConfig = {
  insert: `INSERT INTO ali_rp_check (platform, patientSex, patientAge, primaryDiagnosis, medicines, pass, params, error) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
};
module.exports = sqlConfig;
