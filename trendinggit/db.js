import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'github_repositories',
    password: '312004',
    port: 5432,
});

export { pool };
