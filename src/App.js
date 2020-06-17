import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Projeto ${Date.now()}`,
      url: `http://github.com/urzum/projeto_${Date.now()}`,
      techs: ["NodeJS", "ReactJS"],
    });

    setRepository([response.data, ...repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filterRepositories = repository.filter(
      (repository) => repository.id !== id
    );

    setRepository(filterRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repository_li) => (
          <li key={repository_li.id}>
            {repository_li.title}
            <button onClick={() => handleRemoveRepository(repository_li.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
