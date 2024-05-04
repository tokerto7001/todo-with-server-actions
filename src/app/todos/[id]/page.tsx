import UpdateTodoForm from "@/components/update-todo-form";
import UpdateTodoStatusForm from "@/components/update-todo-status-form";
import { db } from "@/db";
import { Button, Input } from "@nextui-org/react";
import { notFound } from "next/navigation";


interface TodoProps {
    params: {
        id: string;
    }
}

export default async function Todo({params}: TodoProps){
    const {id} = params;

    if(isNaN(Number(id))) return notFound();

    const todo = await db.todos.findFirst({
        where: {
            id: Number(id)
        }
    });
    if(!todo) return notFound();

    return (
        <div className="w-1/2 ml-8 mt-10 flex gap-10 max-md:flex-col">
            <UpdateTodoForm todo={todo} />
            <UpdateTodoStatusForm isCompleted={todo.isCompleted} id={todo.id} />
        </div>
    )
}