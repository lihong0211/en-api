const sqlConfig = {
  insert: `INSERT INTO ali_rp_check (createAt, patientSex, patientAge, primaryDiagnosis, illDesc, sicknessDetail, medicines, pass, reason, query, rpID, refuse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

module.exports = sqlConfig;
