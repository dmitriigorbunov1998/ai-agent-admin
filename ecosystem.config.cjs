module.exports = {
  apps: [
    {
      name: 'clio-admin',
      cwd: __dirname,

      script: 'npm',
      args: 'run start',

      env: {
        NODE_ENV: 'production',
      },

      autorestart: true,
      watch: false,

      restart_delay: 3000,
      max_memory_restart: '512M',

      time: true,
      merge_logs: true,
    },
  ],
};
