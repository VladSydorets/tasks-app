import React, { useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

export interface TaskProps {
  task: any;
  setTasks: any;
  index: number;
  checkTask: (id: number) => void;
  removeTask: (id: number) => void;
  updateText: (id: number, text: string) => void;
}

export const Task = (props: TaskProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // input ref
  const inputRef = useRef<HTMLInputElement>(null);

  const pText = (
    <p
      className={`text-gray-300 font-normal text-base leading-5 text-left ${
        props.task.done ? "line-through opacity-75" : ""
      }`}
      onClick={handleEditClick}
    >
      {props.task.text}
    </p>
  );

  const editInput = (
    <input
      defaultValue={props.task.text}
      size={props.task.text.length}
      ref={inputRef}
      autoFocus
      onChange={resizeInput}
      onKeyUp={handleKeyUp}
      className={`text-gray-300 font-normal w-full leading-6 text-base rounded-md bg-zinc-800`}
    ></input>
  );

  // function to resize the input when the input value changes
  function resizeInput(e: any) {
    e.target.size = e.target.value.length > 0 ? e.target.value.length : 1;
    if (inputRef.current !== null) inputRef.current.value = e.target.value;
  }

  // updates the text value of the task and sets isEditing to false, unmounting the input field
  function editText() {
    if (inputRef.current !== null)
      props.updateText(props.task.id, inputRef.current.value);
    setIsEditing(false);
  }

  function handleKeyUp(e: any) {
    if (e.code === "Enter") {
      editText();
    }
  }

  function handleCheckClick() {
    props.checkTask(props.task.id);
  }

  function handleRemoveClick() {
    props.removeTask(props.task.id);
  }

  function handleEditClick() {
    setIsEditing(!isEditing);
    if (inputRef.current != null) editText();
  }

  function getDayOfYear(date: Date): number {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
    const differenceInMilliseconds = timestamp1 - timestamp2;
    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

    return differenceInDays;
  }

  function formatDate(date: Date): React.ReactElement {
    const today = new Date();
    const dateTime = new Date(date);
    let color = "";
    let displayDate = "";

    const difference = getDayOfYear(dateTime) - getDayOfYear(today);

    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (difference < 7) {
      if (difference === 0) {
        displayDate = "Today";
        color = "text-red-500";
      } else if (difference === 1) {
        displayDate = "Tomorrow";
        color = "text-yellow-500";
      } else {
        displayDate = week[dateTime.getDay()];
        color = "text-cyan-500";
      }
    } else {
      displayDate = `${dateTime.getDate()}/${dateTime.getMonth()}`;
      color = "text-green-500";
    }

    return (
      <div className={`date ${color}`}>
        <i className="fa-regular fa-calendar "></i>{" "}
        <span className="leading-none">{displayDate}</span>
      </div>
    );
  }

  const boxStyling =
    "text-pink-400 text-base hover:text-pink-300 hover:cursor-pointer transition-colors ease-in delay-300 duration-300 mr-2";

  return (
    <Draggable
      key={props.task.id}
      draggableId={props.task.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={props.task.id}
          className="task-element py-1.5 px-2 rounded-lg w-full bg-zinc-800 border border-zinc-800 hover:border-zinc-500 transition-colors ease-in duration-300 hover:cursor-pointer flex flex-col mr-10"
        >
          <div className="top-row flex justify-between">
            <div className="flex task-display">
              <i
                className={`fa-regular fa-${
                  props.task.done ? "square-check" : "square"
                } ${boxStyling}`}
                onClick={handleCheckClick}
              ></i>
              {isEditing ? editInput : pText}
            </div>
            <div className="btns-control flex justify-between ml-2">
              <i
                className={`fa-regular fa-pen-to-square ${boxStyling}`}
                onClick={handleEditClick}
              ></i>
              <i
                className={`fa-solid fa-xmark justify-self-end ${boxStyling}`}
                onClick={handleRemoveClick}
              ></i>
            </div>
          </div>
          {props.task.date || props.task.tag ? (
            <div className="optional-info bottom-row flex gap-3 px-6 my-1 h-[20px] text-sm">
              {props.task.tag ? (
                <div className="tag border border-pink-400 rounded-xl px-2 flex">
                  <span className="text-pink-400 leading-none">
                    {props.task.tag}
                  </span>
                </div>
              ) : null}
              {props.task.date ? formatDate(props.task.date) : null}
            </div>
          ) : null}
        </li>
      )}
    </Draggable>
  );
};
