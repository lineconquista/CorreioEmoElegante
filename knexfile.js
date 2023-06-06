import * as dotenv from 'dotenv';
dotenv.config({ path: `./.env`});

const config = {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      } 
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations/',
      extension: 'js',
    },
  };
  
export default config;