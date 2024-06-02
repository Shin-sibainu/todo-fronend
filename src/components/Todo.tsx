import { useState } from "react";
import { Todo } from "../types/types";

interface TodoItem {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, isCompleted: boolean) => void;
}

const TodoItem = ({ todo, onDelete, onEdit }: TodoItem) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputText, setIsInputText] = useState<string>(todo.title);
  const [isCompleted, setIsCompleted] = useState<boolean>(
    todo.status === "done"
  );

  const handleSave = () => {
    onEdit(todo.id!, inputText, isCompleted);
    setIsEditing(false);
  };

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    onEdit(todo.id!, todo.title, !isCompleted);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 dark:bg-gray-700">
      <div className="flex items-center space-x-2">
        <input
          className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:checked:bg-blue-500 dark:checked:border-blue-500"
          type="checkbox"
          checked={isCompleted}
          onChange={toggleCompletion}
        />
        {isEditing ? (
          <input
            type="text"
            className="px-2 focus:outline-none"
            value={inputText}
            onChange={(e) => setIsInputText(e.target.value)}
          />
        ) : (
          <span
            className={`text-gray-800 dark:text-gray-200 ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <button onClick={handleSave}>保存</button>
        ) : (
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => setIsEditing(true)}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}

        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(todo.id!)}
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
