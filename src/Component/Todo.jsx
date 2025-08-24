import React, { useEffect, useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load Todos in LoacalStorage
  // localStorage.setItem("lastname", "Smith");
  // localStorage.getItem("lastname");

  const todoKey = "todos";
  useEffect(() => {
    const storedTodos = localStorage.getItem(todoKey);
    console.log(storedTodos);
    if (storedTodos) {
      setTasks(JSON.parse(storedTodos));
    }
  }, []); // empty bcz runs only once

  //set in LS
  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(tasks));
  }, [tasks]); // whenever todos updates

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter the task");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask(""); // reset the input field after adding the todo
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-purple-950 flex items-center justify-center p-6">
      <div className="bg-purple-700 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          TaskTango✨📝
        </h1>
        <h3 className="flex items-center justify-center text-white">
          "Get It Done, One Task at a Time"⏱️
        </h3>

        <br></br>
        <div className="flex gap-2 mb-6">
          <input
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Add a new task..."
            value={task}
            className="flex-1 px-4 py-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-purple-800 text-white"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Add
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3 text-white">Your Tasks :</h3>
        <ul className="space-y-2">
          {tasks.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-purple-500 px-4 py-2 rounded-lg shadow-sm"
            >
              {/* Task Text */}
              <span
                className={`${
                  todo.completed ? "line-through text-black" : "text-white"
                }`}
              >
                {todo.text}
              </span>

              {/* Buttons wrapper */}
              <div className="flex gap-2">
                {/* Toggle Complete Button */}
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`px-3 py-1 text-sm rounded-lg font-medium transition ${
                    todo.completed
                      ? "bg-green-400 text-black hover:bg-green-500"
                      : "bg-yellow-400 text-black hover:bg-yellow-500"
                  }`}
                >
                  {todo.completed ? "Undo" : "Mark Done"}
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeTask(todo.id)}
                  className="px-3 py-1 text-sm rounded-lg font-medium bg-red-600 text-black hover:bg-red-700 transition"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
