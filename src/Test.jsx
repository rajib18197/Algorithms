import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);

  const data = [
    { id: 1, type: "expense", name: "Grocery", price: 1000 },
    { id: 2, type: "Income", name: "Salary", price: 150000 },
  ];
  const [dataToUpdate, setDataToUpdate] = useState(null);

  function handleDataToUpdate(data) {
    setDataToUpdate(data);
  }

  return (
    <div>
      <button onClick={() => setCount((v) => v + 1)}>learn {count}</button>
      <ExpenseIncomeList data={data} onDataUpdate={handleDataToUpdate} />
      <Form dataToUpdate={dataToUpdate} />
      {/* <Form dataToUpdate={dataToUpdate} key={dataToUpdate?.id} /> */}
    </div>
  );
}

// null - 1 - 2
function Form({ dataToUpdate }) {
  console.log("one");

  const [id, setId] = useState(dataToUpdate?.id);
  const [state, setState] = useState(
    dataToUpdate ?? {
      name: "",
      price: "",
    }
  );
  if (dataToUpdate?.id && id !== dataToUpdate?.id) {
    setState(dataToUpdate);
    setId(dataToUpdate.id);
    return;
  }

  console.log("two");

  return (
    <form>
      <div>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </div>

      <div>
        <input
          type="number"
          name="price"
          value={state.price}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </div>
    </form>
  );
}

function ExpenseIncomeList({ data, onDataUpdate }) {
  return (
    <div>
      {data.map((el) => (
        <div key={el.id} onClick={() => onDataUpdate(el)}>
          <h3>
            {el.type} {el.name}
          </h3>
          <p>{el.price}</p>
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    status: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const addProject = () => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setNewProject({ title: "", status: "", description: "" });
  };

  const updateProject = () => {
    setProjects(
      projects.map((project) =>
        project.id === editingId ? { ...newProject, id: editingId } : project
      )
    );
    setEditingId(null);
    setNewProject({ title: "", status: "", description: "" });
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const startEditing = (project) => {
    setEditingId(project.id);
    setNewProject({
      title: project.title,
      status: project.status,
      description: project.description,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Status"
          className="border p-2 mr-2"
          value={newProject.status}
          onChange={(e) =>
            setNewProject({ ...newProject, status: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
        {editingId === null ? (
          <button className="bg-blue-500 text-white p-2" onClick={addProject}>
            Add Project
          </button>
        ) : (
          <button
            className="bg-green-500 text-white p-2"
            onClick={updateProject}
          >
            Update Project
          </button>
        )}
      </div>

      <ul>
        {projects.map((project) => (
          <li key={project.id} className="border p-2 mb-2">
            <h3 className="font-bold">{project.title}</h3>
            <p>Status: {project.status}</p>
            <p>Description: {project.description}</p>
            <button
              className="bg-yellow-500 text-white p-1 mr-2"
              onClick={() => startEditing(project)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-1"
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
