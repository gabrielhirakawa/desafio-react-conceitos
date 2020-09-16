import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepos(data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("/repositories", {
      title: "Desafio React",
      url: "react.org",
      techs: ["react"],
    });

    setRepos([...repos, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepos = repos.filter((item) => item.id !== id);
    setRepos(newRepos);
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
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
