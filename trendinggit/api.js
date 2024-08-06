import express from 'express';
import { fetchTrendingRepositories } from './githubService.js';
import { pool } from './db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

async function syncAndStoreRepositories() {
    try {
        console.log('Starting synchronization...');
        
        const trendingRepos = await fetchTrendingRepositories();
        
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM repositories');
            await Promise.all(trendingRepos.map(repo =>
                client.query('INSERT INTO repositories (name, full_name, description, html_url, stars, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
                    [repo.name, repo.full_name, repo.description, repo.html_url, repo.stars, new Date(repo.created_at)]
                )
            ));
            console.log('Synchronization successful');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Failed to sync repositories:', error);
    }
}

app.post('/sync', async (req, res) => {
    try {
        await syncAndStoreRepositories();
        res.json({ message: 'Синхронизация успешна' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/repositories', async (req, res) => {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM repositories');
            const repositories = result.rows;
            res.json(repositories);
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/repositories/:query', async (req, res) => {
    const query = req.params.query;
    try {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM repositories WHERE name = $1 OR id::text = $1', [query]);
            const repository = result.rows[0];
            if (repository) {
                res.json(repository);
            } else {
                res.status(404).json({ message: 'Репозиторий не найден' });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const syncInterval = 60 * 1000;
setInterval(async () => {
    await syncAndStoreRepositories();
}, syncInterval);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
