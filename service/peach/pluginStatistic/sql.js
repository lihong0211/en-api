const sqlConfig = {
  update: `
          UPDATE plugin_statistic
          SET logout_time = NOW(), status = 'offline' 
          WHERE user_name = ? AND status = 'online'
        `,

  insert: `
          INSERT INTO plugin_statistic
          (user_name,platform,plugin_version,login_time,status)
          VALUES (?, ?, ?, NOW(), ?)
        `,

  detail: `
          SELECT 
          user_name, 
          platform,
          plugin_version,
          SEC_TO_TIME(duration) AS duration,
          DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') AS login_time,
          DATE_FORMAT(logout_time, '%Y-%m-%d %H:%i:%s') AS logout_time

          FROM plugin_statistic
          WHERE platform = ? 
          AND user_name = ? 
          AND login_time BETWEEN ? AND ?
        `,
};

module.exports = sqlConfig;
