import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskInput } from "./TaskInput";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const Todo = () => {
  type Tag = "home" | "work" | { custom: string };

  // Readonly Todo task type
  type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
    date?: Date;
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

  const tasksList = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      setTasks={setTasks}
      index={index}
      checkTask={checkTask}
      removeTask={removeTask}
      updateText={updateText}
    />
  ));

  function addTask(value: string, date: Date, tag: Tag): void {
    const newTask = {
      id: tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 0,
      text: value,
      date: date,
      tag: tag,
      done: false,
    };
    console.log(newTask.id);

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

  function updateTextInTask(todo: Todo, text: string): Todo {
    return {
      ...todo,
      text: text,
    };
  }

  function updateText(id: number, text: string): void {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updateTextInTask(task, text) : task
    );
    setTasks(updatedTasks);
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

  function handleOnDragEnd(result: any): void {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  }

  // save data in the localStorage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="wrapper h-full flex justify-center items-center ">
      <div className="container flex flex-col gap-4 w-[50rem] h-5/6 overflow-auto">
        <TaskInput addTask={addTask} />
        <h2 className="text-gray-300 text-base font-medium self-start justify-self-start m-3">
          Tasks - {tasks.length}
        </h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={"tasks"}>
            {(provided) => (
              <ul
                className="flex flex-col gap-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasksList}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className="bottom-btns flex justify-between mb-4">
          <button className="text-gray-300 w-fit" onClick={handleCheckAll}>
            Mark all as completed
          </button>
          <button className="text-gray-300 w-fit" onClick={handleRemoveChecked}>
            Remove all checked
          </button>
        </div>
      </div>
    </div>
  );
};
