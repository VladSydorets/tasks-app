import React from "react";
import { useRef } from "react";

type TaskInputProps = {
  addTask: any;
};

export const TaskInput = (props: TaskInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: any) {
    if (inputRef.current != null) {
      if (e.key === "Enter" && inputRef.current.value !== "") handleAddTask();
    }
  }

  function handleAddTask() {
    if (inputRef.current != null) {
      props.addTask(
        `${inputRef.current.value[0].toUpperCase()}${inputRef.current.value.slice(
          1
        )}`
      );

      inputRef.current.value = "";
    }
  }

  return (
    <div className="input-wrap relative w-full">
      <button
        onClick={handleAddTask}
        className="absolute left-2 top-2 bg-pink-400 hover:bg-pink-300 transition-colors delay-300 ease-in duration-300 p-1 rounded-lg text-base w-6 h-6 flex justify-center items-center"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder="Add a task"
        className="w-full h-10 px-10 p-1 bg-zinc-900 border-2 rounded-xl border-zinc-800 focus:border-zinc-600 placeholder-orange-50 text-orange-50 text-sm"
      />
    </div>
  );
};
