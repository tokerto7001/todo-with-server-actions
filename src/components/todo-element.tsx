import { Button } from "@nextui-org/react"
import { Todos } from "@prisma/client"
import Link from "next/link"
import * as actions from '@/actions'


interface TodoElementProps {
    todo: Todos
}

export default function TodoElement({ todo }: TodoElementProps){
    const deleteTodoAction = actions.deleteTodo.bind(null, todo.id);

    return (
        <Link href={`/todos/${todo.id}`} className={`flex items-center justify-between border p-3 ${todo.isCompleted ? 'bg-green-300' : 'bg-amber-300'}  rounded-xl`}>
            <div className={`${todo.isCompleted ? 'line-through' : ''}`}>{todo.todo}</div>
            <div>{todo.isCompleted ? 'Completed' : 'UnCompleted'}</div>
            <div>{todo.createdAt.toDateString()}</div>
            <form action={deleteTodoAction}>
                <Button color="danger" type="submit">Delete</Button>
            </form>
        </Link>
    )
}