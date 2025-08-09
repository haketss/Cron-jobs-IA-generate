// db.js
import postgres from 'postgres';

const Sql = postgres({
  user: 'docker',
  host: 'localhost',
  database: 'polls',
  password: 'docker',
  port: 5432,
});

export default Sql;
