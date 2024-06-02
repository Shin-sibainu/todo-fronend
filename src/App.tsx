import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import TodoApp from "./components/TodoApp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

export default App;
