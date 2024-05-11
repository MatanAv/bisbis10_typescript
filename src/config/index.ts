const config = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD || 'example',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'postgres'
  }
};

export default config;
