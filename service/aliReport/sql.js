const sqlConfig = {
  insert:
    'INSERT INTO ali_rp_check (id, createAt, patientSex, patientAge, primaryDiagnosis, illDesc, sicknessDetail, medicines, pass, reason, query) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE query = VALUES(query), pass = VALUES(pass), reason = VALUES(reason)',
};

module.exports = sqlConfig;
