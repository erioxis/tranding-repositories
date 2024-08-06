import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function getRepositories() {
    try {
        const response = await fetch(`${BASE_URL}/repositories`);
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
        }
        const repositories = await response.json();
        console.log('Repositories:');
        console.log(repositories);
    } catch (error) {
        console.error(error.message);
    }
}

async function syncWithGitHub() {
    try {
        const response = await fetch(`${BASE_URL}/sync`, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`Failed to sync with GitHub: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error(error.message);
    }
}

async function getRepository(query) {
    try {
        const response = await fetch(`${BASE_URL}/repositories/${query}`);
        if (!response.ok) {
            throw new Error(`Repository not found: ${response.status} ${response.statusText}`);
        }
        const repository = await response.json();
        console.log('Repository:');
        console.log(repository);
    } catch (error) {
        console.error(error.message);
    }
}

const args = process.argv.slice(2);
const command = args[0];

if (command === 'sync') {
    syncWithGitHub();
} else if (command === 'get') {
    const query = args[1];
    getRepository(query);
} else if (command === 'list') {
    getRepositories();
} else {
    console.log('Usage:');
    console.log('node cli.js sync - Start synchronization with GitHub');
    console.log('node cli.js get <repository_name_or_id> - Get a repository by name or ID');
    console.log('node cli.js list - Get all repositories');
}
