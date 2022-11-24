import React from "react";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export interface TaskInputProps {
  addTask: any;
}

export const TaskInput = (props: TaskInputProps) => {
  const textRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date>(new Date());

  const inputStyling =
    "h-10 px-4 p-1 bg-zinc-900 border-2 border-zinc-800 focus:border-zinc-600 placeholder-zinc-300 text-orange-50 text-sm";

  function handleAddTask() {
    if (textRef.current != null && tagRef.current != null) {
      props.addTask(
        `${textRef.current.value[0].toUpperCase()}${textRef.current.value.slice(
          1
        )}`,
        date,
        `${tagRef.current.value[0].toUpperCase()}${tagRef.current.value.slice(
          1
        )}`
      );

      textRef.current.value = "";
      tagRef.current.value = "";
    }
  }

  return (
    <div className="input-wrap relative w-full flex">
      <button
        onClick={handleAddTask}
        className="absolute left-2 top-2 bg-pink-400 hover:bg-pink-300 transition-colors delay-300 ease-in duration-300 p-1 rounded-lg text-base w-6 h-6 flex justify-center items-center"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <input
        ref={textRef}
        placeholder="Task name"
        className={`rounded-l-xl w-7/12 pl-10 ${inputStyling}`}
      />
      <div className="date-picker w-2/12">
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          placeholderText={"Due date"}
          popperPlacement="bottom-end"
          className={`${inputStyling} border-x-transparent w-full`}
          minDate={new Date()}
          showDisabledMonthNavigation
          fixedHeight
        />
      </div>
      <input
        ref={tagRef}
        className={`rounded-r-xl w-3/12 ${inputStyling}`}
        placeholder="Tag"
      />
    </div>
  );
};
