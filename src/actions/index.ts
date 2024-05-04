'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import z, { ZodError } from 'zod';

const createTodoSchema = z.object({
    todo: z.string().min(3)
});

export interface CreateTodoFormState {
    errors: {
        todo?: string[];
        _form?: string[];
    };
    success?: boolean
}

export async function createTodo(formState:CreateTodoFormState, formData: FormData): Promise<CreateTodoFormState>{
    const todo = formData.get('todo');

    const validationResult = createTodoSchema.safeParse({todo});

    if(!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    try{
        await db.todos.create({
            data: {
                todo: validationResult.data.todo
            }
        })
    
    }catch(err: unknown){
        if(err instanceof ZodError){
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } {
            return {
                errors: {
                    _form: ['Something went wrong!']
                }
            }
        }
    }

    return {
        errors: {},
        success: true
    }
}
