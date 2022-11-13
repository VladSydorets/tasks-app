// import React, { useState, useRef, useEffect } from "react";
import React from "react";

type TaskProps = {
  id: number;
  text: string;
  completed: boolean;
  setTasks: any;
  checkTask: any;
  removeTask: any;
};

export const Task = (props: TaskProps) => {
  // function completeAll(todos: readonly Todo[]): CompletedTodo[] {
  //   return todos.map((todo) => ({
  //     ...todo,
  //     done: true,
  //   }));
  // }

  // function toggleTodo(todo: Todo): Todo {
  //   return {
  //     ...todo,
  //     done: !todo.done,
  //   };
  // }

  // function tagToString(tag: Tag): string {
  //   return `fa-${tag} ${tag}`;
  // }

  // const inputRef = useRef<HTMLInputElement>(null);

  // function handleAddTask() {
  //   // let newArr = [...tasks];
  //   if (inputRef.current != null && inputRef.current.value !== "") {
  //     let newTask = {
  //       id: tasks[tasks.length - 1].id + 1,
  //       text: `${inputRef.current.value[0].toUpperCase()}${inputRef.current.value.slice(
  //         1
  //       )}`,
  //       done: false,
  //     };
  //     setTasks([...tasks, newTask]);
  //     inputRef.current.value = "";
  //   }
  // }

  // function handleInputChange(e: any) {
  //   if (e.target.value !== "") e.target.value[0].toUpperCase();
  // }

  function handleCheckClick() {
    props.checkTask(props.id);
  }

  function handleRemoveClick() {
    props.removeTask(props.id);
  }

  const boxStyling =
    "text-pink-400 text-base hover:text-pink-300 hover:cursor-pointer transition-colors ease-in delay-300 duration-300 mr-2";

  return (
    <li
      key={props.id}
      className="py-1.5 px-2 rounded-lg w-full bg-zinc-800 hover:bg-zinc-700 transition-colors ease-in duration-300 hover:cursor-pointer flex justify-between"
    >
      <div className="flex">
        <i
          className={`fa-regular fa-${
            props.completed ? "square-check" : "square"
          } ${boxStyling}`}
          onClick={handleCheckClick}
        ></i>
        <p
          className={`text-gray-300 font-normal text-base leading-5 align-middle text-left ${
            props.completed ? "line-through opacity-75" : ""
          }`}
        >
          {props.text}
        </p>
      </div>
      <i
        className={`fa-solid fa-xmark justify-self-end ${boxStyling}`}
        onClick={handleRemoveClick}
      ></i>
    </li>
  );
};
