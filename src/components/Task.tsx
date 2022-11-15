import React, { useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

type TaskProps = {
  id: number;
  text: string;
  completed: boolean;
  setTasks: any;
  index: number;
  checkTask: (id: number) => void;
  removeTask: (id: number) => void;
  updateText: (id: number, text: string) => void;
};
/* 
  Some problems to solve:
  (1) Multiple lines task:
    - Change <input> to <textarea> when there are multiple lines, or
    - Change <input> to <textarea> in general
  (2) When editing is active, click away to hide input and save the changes

*/

export const Task = (props: TaskProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // input ref
  const inputRef = useRef<HTMLInputElement>(null);

  const pText = (
    <p
      className={`text-gray-300 font-normal text-base leading-6 align-middle text-left ${
        props.completed ? "line-through opacity-75" : ""
      }`}
      onClick={handleEditClick}
    >
      {props.text}
    </p>
  );

  const editInput = (
    <input
      defaultValue={props.text}
      size={props.text.length}
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
      props.updateText(props.id, inputRef.current.value);
    setIsEditing(false);
  }

  function handleKeyUp(e: any) {
    if (e.code === "Enter") {
      editText();
    }
  }

  function handleCheckClick() {
    props.checkTask(props.id);
  }

  function handleRemoveClick() {
    props.removeTask(props.id);
  }

  function handleEditClick() {
    setIsEditing(!isEditing);
    if (inputRef.current != null) editText();
  }

  const boxStyling =
    "text-pink-400 text-base hover:text-pink-300 hover:cursor-pointer transition-colors ease-in delay-300 duration-300 mr-2";

  return (
    <Draggable
      key={props.id}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={props.id}
          className="py-1.5 px-2 rounded-lg w-full bg-zinc-800 border border-zinc-800 hover:border-zinc-500 transition-colors ease-in duration-300 hover:cursor-pointer flex justify-between mr-10"
        >
          <div className="flex">
            <i
              className={`fa-regular fa-${
                props.completed ? "square-check" : "square"
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
        </li>
      )}
    </Draggable>
  );
};
