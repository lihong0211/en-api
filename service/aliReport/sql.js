const sqlConfig = {
  insert: `INSERT INTO ali_rp_check
    (createAt, patientSex, patientAge, primaryDiagnosis, illDesc, sicknessDetail, medicines, pass, reason, query) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE 
    query = INSERT(query), 
    pass = INSERT(pass), 
    reason = INSERT(reason)`,
};

module.exports = sqlConfig;
