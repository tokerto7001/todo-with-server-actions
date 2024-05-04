import { Todos } from "@prisma/client"


interface TodoElementProps {
    todo: Todos
}

export default function TodoElement({ todo }: TodoElementProps){
    return (
        <div>
            {todo.todo} {todo.isCompleted ? 'completed' : 'not'} {todo.createdAt.toDateString()}
        </div>
    )
}