const sqlConfig = {
  insert:
    'INSERT INTO `check` (platform, patientSex, patientAge, primaryDiagnosis, medicines, pass, params, error, isNotMatch, doctor, fullName, specification, takeDirection, takeFrequence, medicineAmount, takeDose,formType,) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
};
module.exports = sqlConfig;
