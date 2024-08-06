import React from 'react';
import axios from 'axios';

const SyncButton = ({ onSuccessSync }) => {
  const syncWithGitHub = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sync');
      alert(response.data.message);
      onSuccessSync();
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <button className="btn btn-primary" onClick={syncWithGitHub}>
      Синхронизировать с GitHub
    </button>
  );
};

export default SyncButton;
