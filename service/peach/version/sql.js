const sqlConfig = {
  insert:
    'INSERT INTO version (version, name, platform) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE version = VALUES(version)',
  list: 'select * from version',
};

module.exports = sqlConfig;
