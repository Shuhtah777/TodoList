import './App.css'
import React, { useState } from "react";


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">TODO List</h1>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <div className="todo-content">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggleTask(task.id)}
              />
              <span className={`todo-text ${task.done ? "done" : ""}`}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="delete-button"
            >
              [X]
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Нове завдання..."
          className="todo-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Додати
        </button>
      </div>

      <button onClick={handleDeleteCompleted} className="clear-button">
        Видалити виконане
      </button>
    </div>
  );
};

export default TodoApp;
