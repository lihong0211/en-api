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
          duration,
          DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') AS login_time,
          DATE_FORMAT(logout_time, '%Y-%m-%d %H:%i:%s') AS logout_time

          FROM plugin_statistic
          WHERE platform = ? 
          AND user_name = ? 
          AND login_time BETWEEN ? AND ?
        `,

  list: `
          SELECT 
          DATE_FORMAT(login_time, '%Y-%m-%d') AS login_date,
          SUM(TIMESTAMPDIFF(SECOND, login_time, logout_time)) AS total_duration_seconds,
          SEC_TO_TIME(SUM(TIMESTAMPDIFF(SECOND, login_time, logout_time))) AS total_duration_hms
          FROM plugin_statistic
          WHERE platform = ? 
          AND user_name = ? 
          AND login_time BETWEEN ? AND ?
          AND logout_time IS NOT NULL  -- 确保登出时间不为空
          GROUP BY DATE_FORMAT(login_time, '%Y-%m-%d')
          ORDER BY login_date;
          `,
};

module.exports = sqlConfig;
