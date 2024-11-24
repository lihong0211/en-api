const sqlConfig = {
  insert:
    'INSERT INTO ali_rp_check (uid, query, pass, reason) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE query = VALUES(query), pass = VALUES(pass), reason = VALUES(reason)',
};

module.exports = sqlConfig;
