import CreateTodoForm from "@/components/create-todo-form";
import TodoList from "@/components/todo-list";
import { db } from "@/db";

interface HomeProps {
  searchParams: {
    page?: string
  }
}

export default async function Home({searchParams}: HomeProps) {
  const { page } = searchParams;

  const todos = await db.todos.findMany({
    take: 10,
    skip: (Number(page) || 1 - 1) * 10
  });

  return (
    <div className="flex w-1/2 mx-auto mt-6 gap-8">
      <TodoList todos={todos} />
      <CreateTodoForm />
    </div>
  );
}
