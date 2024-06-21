import { describe, expect, test } from "vitest";
import TodoApp from "../../components/TodoApp";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();

const renderWithClient = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe(TodoApp, () => {
  test("データフェッチ中のローディング状態が出力される", () => {
    renderWithClient(<TodoApp />);
    screen.debug();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Todoアプリが表示されている", async () => {
    renderWithClient(<TodoApp />);

    expect(await screen.findByText(/Todo App/i)).toBeInTheDocument();
    expect(await screen.findByText(/Add/i)).toBeInTheDocument();

    expect(
      await screen.findByPlaceholderText("Add a new task")
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "Add" })
    ).toBeInTheDocument();
  });

  test("Todo一覧が表示されている", async () => {
    renderWithClient(<TodoApp />);

    expect(await screen.findByText("読書")).toBeInTheDocument();
    expect(await screen.findByText("散歩")).toBeInTheDocument();

    expect(
      (await screen.findAllByRole("button", { name: "編集" })).length
    ).toBeGreaterThan(0);

    expect(
      (await screen.findAllByRole("button", { name: "削除" })).length
    ).toBeGreaterThan(0);
  });

  test("Todoを追加する", async () => {
    renderWithClient(<TodoApp />);

    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "新しいタスク");

    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    expect(await screen.findByText("新しいタスク")).toBeInTheDocument();
  });

  test("Todoを削除する", async () => {
    renderWithClient(<TodoApp />);

    //新しいTodoを追加
    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "削除するタスク");
    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    //追加されたTodoを確認
    expect(await screen.findByText("削除するタスク")).toBeInTheDocument();

    //追加されたTodoを削除
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await userEvent.click(deleteButtons[deleteButtons.length - 1]);

    await waitFor(() => {
      expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument();
    });
  });

  test("Todoを編集する", async () => {
    renderWithClient(<TodoApp />);

    //新しいTodoを追加
    const input = screen.getByPlaceholderText("Add a new task");
    await userEvent.type(input, "編集するタスク");
    const addButton = screen.getByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    //追加されたTodoを確認
    expect(await screen.findByText("編集するタスク")).toBeInTheDocument();

    //追加されたTodoを編集
    const editButtons = await screen.findAllByRole("button", { name: "編集" });
    await userEvent.click(editButtons[editButtons.length - 1]);

    const editInput = await screen.findByDisplayValue("編集するタスク");
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "編集後のタスク");

    const saveButton = await screen.findByRole("button", { name: "保存" });
    await userEvent.click(saveButton);

    expect(await screen.findByText("編集後のタスク")).toBeInTheDocument();
  });
});
