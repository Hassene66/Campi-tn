module.exports = {
  apps: [
    {
      name: "CampiTN-1",
      script: "server.js",
      args: "instance 1",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
    {
      name: "CampiTN-2",
      script: "server.js",
      args: "instance 2",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5001,
      },
    },
    {
      name: "CampiTN-3",
      script: "server.js",
      args: "instance 3",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5002,
      },
    },
    {
      name: "CampiTN-4",
      script: "server.js",
      args: "instance 4",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5003,
      },
    },
    {
      name: "CampiTN-5",
      script: "server.js",
      args: "instance 5",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5004,
      },
    },
    {
      name: "CampiTN-6",
      script: "server.js",
      args: "instance 6",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 5005,
      },
    },
  ],
};
