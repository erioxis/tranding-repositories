import fetch from 'node-fetch';

async function fetchTrendingRepositories() {
    const url = 'https://api.github.com/search/repositories?q=created:%3E2023-01-01&sort=stars&order=desc';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Запрос к GitHub API не удался: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.items;
}

export { fetchTrendingRepositories };
