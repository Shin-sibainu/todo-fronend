import { useQuery } from "@tanstack/react-query";

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      if (!response.ok) {
        throw new Error("Network response wa not ok");
      }
      return response.json();
    },
  });
};
