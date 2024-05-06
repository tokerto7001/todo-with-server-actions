import { db } from "@/db"
import TodoElement from "./todo-element";
import { Todos } from "@prisma/client";

interface TodoListProps {
    page: number
}

export default async function TodoList({page}: TodoListProps){

    const todos = await db.todos.findMany({
        take: 10,
        skip: (page - 1) * 10,
      });

    if(!todos.length) {
        return (
            <div className="mx-auto flex justify-center">
                Nothing to show
            </div>
        )
    }

    return (
        <div className="container mx-auto flex flex-col gap-3">
            {
                todos.map((todo) => (
                    <TodoElement key={todo.id} todo={todo} />
                ))
            }
        </div>
    )
}