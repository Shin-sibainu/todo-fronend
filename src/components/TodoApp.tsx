import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useFetchTodos } from "../hooks/query";
import { useDeleteTodo, useEditTodo } from "../hooks/mutation";

const TodoApp = () => {
  const { data: todos, error, isLoading } = useFetchTodos();
  const deleteMutation = useDeleteTodo();
  const editMutation = useEditTodo();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (id: number, title: string, isCompleted: boolean) => {
    editMutation.mutate({ id, title, isCompleted });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Todo App
        </h1>
        <TodoInput />
        <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </main>
  );
};

export default TodoApp;
