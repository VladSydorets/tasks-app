import React from "react";
import { Draggable } from "react-beautiful-dnd";

type TaskProps = {
  id: number;
  text: string;
  completed: boolean;
  setTasks: any;
  index: number;
  checkTask: (id: number) => void;
  removeTask: (id: number) => void;
};

export const Task = (props: TaskProps) => {
  function handleCheckClick() {
    props.checkTask(props.id);
  }

  function handleRemoveClick() {
    props.removeTask(props.id);
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
          className="py-1.5 px-2 rounded-lg w-full bg-zinc-800 hover:bg-zinc-700 transition-colors ease-in duration-300 hover:cursor-pointer flex justify-between mr-10"
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
      )}
    </Draggable>
  );
};
