// import React, { useState, useEffect } from "react";
// function App(){
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask=()=>{
//     if(task.trim() !== "")return;
//     setTasks([...tasks, task]);
//     setTask("");
//   };
//   const deleteTask=(index)=>{
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     <div style={{textAlign: "center", marginTop: "30px"}}>
//       <h2>React ToDo App</h2>
//       <input
//         type="text"
//         placeholder="Enter a task"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button onClick={addTask}>Add Task</button>
//       <ul>
//         {tasks.map((t, index) => (
//           <li key={index}>
//             {t}
//             <button onClick={() => deleteTask(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>

//   );
// }
// export default App;
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Load saved todos when the app first starts
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  return (
    <main className="todo-app">
      <h1 style={{ color: "#302e2e" }}>My ToDo List</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
        />

        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-message">No tasks yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
              </label>

              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
