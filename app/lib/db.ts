import postgres from 'postgres';

// GANTI DARI POSTGRES_URL KE MY_DB_URL
const connectionString = process.env.MY_DB_URL; 

// --- DEBUGGING BLOCK ---
if (!connectionString) {
  throw new Error(`
    FATAL ERROR: MY_DB_URL tidak ditemukan!
    Pastikan Anda sudah membuat variabel 'MY_DB_URL' di Vercel dan melakukan REDEPLOY.
  `);
}
// -----------------------

const sql = postgres(connectionString, { 
  ssl: 'require' 
});

export default sql;