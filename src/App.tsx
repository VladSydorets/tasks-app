import React, { useState, useEffect } from "react";
import { Task } from "./components/Task";
import { TaskInput } from "./components/TaskInput";
import "./App.css";

function App() {
  type Tag = "home" | "work" | { custom: string };

  // Readonly Todo task type
  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
    tag?: Tag;
  }>;

  type CompletedTodo = Todo & {
    readonly done: true;
  };

  type UnCompletedTodo = Todo & {
    readonly done: false;
  };

  // get data from the localStorage and set it tasks state
  const savedData = JSON.parse(localStorage.getItem("data") || "");
  const [tasks, setTasks] = useState<Todo[]>(savedData);

  const tasksList = tasks.map((task) => (
    <Task
      id={task.id}
      text={task.text}
      completed={task.done}
      setTasks={setTasks}
      key={task.id}
      checkTask={checkTask}
      removeTask={removeTask}
    />
  ));

  function addTask(value: string): void {
    const newTask = {
      id: tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 0,
      text: value,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  // toggleTodo function can return only completed or uncompleted task
  function toggleTodo(todo: Todo): CompletedTodo | UnCompletedTodo {
    return {
      ...todo,
      done: !todo.done,
    };
  }

  function checkTask(id: number): void {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? toggleTodo(task) : task
    );
    setTasks(updatedTasks);
  }

  function removeTask(id: number): void {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    return todos.map((todo) => ({
      ...todo,
      done: true,
    }));
  }

  function handleCheckAll(): void {
    setTasks(completeAll(tasks));
  }

  function removeChecked(todos: readonly Todo[]) {
    return todos.filter((todo) => !todo.done);
  }

  function handleRemoveChecked(): void {
    setTasks(removeChecked(tasks));
  }

  // save data in the localStorage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App bg-zinc-900">
      <div className="wrapper h-screen flex justify-center items-center">
        <div className="container flex flex-col gap-4 w-[30rem] h-5/6 overflow-auto">
          <TaskInput addTask={addTask} />
          <h2 className="text-gray-300 text-base font-medium self-start justify-self-start m-3">
            Tasks - {tasks.length}
          </h2>
          <ul className="flex flex-col gap-2">{tasksList}</ul>
          <div className="bottom-btns flex justify-between">
            <button className="text-gray-300 w-fit" onClick={handleCheckAll}>
              Mark all as completed
            </button>
            <button
              className="text-gray-300 w-fit"
              onClick={handleRemoveChecked}
            >
              Remove all checked
            </button>
          </div>
          {/* TODO: button for removing only completed tasks + make these buttons as components */}
        </div>
      </div>
    </div>
  );
}

export default App;
