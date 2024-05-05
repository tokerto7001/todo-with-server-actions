'use client';

import { Button } from "@nextui-org/react";
import { Todos } from "@prisma/client"
import * as actions from '@/actions';
import { useFormState } from "react-dom";
import FormButton from "./form-button";


interface UpdateTodoStatusFormProps {
    isCompleted: Todos['isCompleted'];
    id: Todos['id']
}

export default function UpdateTodoStatusForm({isCompleted, id}: UpdateTodoStatusFormProps){
    const updateTodoStatusAction = actions.updateTodoStatus.bind(null, {isCompleted, id});
    
    return (
        <div className="flex flex-col">
            <p>Status: {isCompleted ? 'Completed' : 'Uncompleted'}</p>
            <form action={updateTodoStatusAction}>
                <FormButton className="mt-5">
                    Change Status
                </FormButton>
            </form>
    </div>
    )
}