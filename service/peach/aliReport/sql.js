const sqlConfig = {
  insert: `INSERT INTO ali_rp_check (pharmacist, patientSex, patientAge, primaryDiagnosis, medicines, pass, reason, query, rpID, refuse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

module.exports = sqlConfig;
