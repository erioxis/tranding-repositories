import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepositoriesList = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/repositories');
        setRepositories(response.data);
      } catch (error) {
        console.error('Ошибка при получении репозиториев:', error.message);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div>
      <h2>Список репозиториев</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> - {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoriesList;
