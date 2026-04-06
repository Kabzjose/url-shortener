import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }  
    : false                          
});

// temporary test — delete after confirming connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection failed:', err.message);
  else console.log('Connected to DB at:', res.rows[0].now);
});

export default pool;