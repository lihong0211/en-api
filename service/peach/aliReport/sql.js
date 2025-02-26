const sqlConfig = {
  insert: `INSERT INTO ali_rp_check (pharmacist, patientSex, patientAge, primaryDiagnosis, illDesc, sicknessDetail, medicines, pass, reason, query, rpID, refuse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};

module.exports = sqlConfig;
