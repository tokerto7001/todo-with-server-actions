import CreateTodoForm from "@/components/create-todo-form";
import TodoList from "@/components/todo-list";
import TodoListLoading from "@/components/todo-list-loading";
import { Suspense } from "react";

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = searchParams;

  return (
    <div className="flex w-1/2 mx-auto mt-6 gap-8 max-md:flex-col-reverse max-md:gap-4 min-w-100">
      <Suspense fallback={<TodoListLoading />}>
        <TodoList page={Number(page) || 1} />
      </Suspense>
      <CreateTodoForm />
    </div>
  );
}
