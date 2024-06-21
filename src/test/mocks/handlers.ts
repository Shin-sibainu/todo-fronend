import { http, HttpResponse } from "msw";
import { beforeEach } from "vitest";
import { Todo } from "../../types/types";

let todos: Todo[];

beforeEach(() => {
  todos = [
    {
      id: 1,
      title: "読書",
      status: "done",
    },
    {
      id: 2,
      title: "散歩",
      status: "done",
    },
  ];
});

export const handlers = [
  http.get("http://localhost:8787/todos", async () => {
    return HttpResponse.json(todos, { status: 200 });
  }),

  http.post("http://localhost:8787/todos", async (req) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todoTitle = (await req.request.json()) as any;
    const newTodo = {
      id: todos.length + 1,
      title: todoTitle.title,
      status: "todo",
    };

    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  http.delete("http://localhost:8787/todos/:id", async (req) => {
    const id = req.params.id;

    todos = todos.filter((todo) => todo.id !== Number(id));

    return HttpResponse.json(
      { message: `Todo with id ${id} has been deleted` },
      { status: 200 }
    );
  }),

  http.put("http://localhost:8787/todos/:id", async (req) => {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateInfo = (await req.request.json()) as any;
    const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

    const updatedTodo = { ...todos[todoIndex], ...updateInfo };
    todos[todoIndex] = updatedTodo;

    return HttpResponse.json(updatedTodo, { status: 200 });
  }),
];
