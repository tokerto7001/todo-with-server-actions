'use server';

import { db } from '@/db';
import { Todos } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Error, { ErrorProps } from 'next/error';
import { redirect } from 'next/navigation';
import z, { ZodError } from 'zod';

const todoSchema = z.object({
    todo: z.string().min(3)
}).strict();

export interface CreateTodoFormState {
    errors: {
        todo?: string[];
        _form?: string[];
    };
    success?: boolean
}

export async function createTodo(formState:CreateTodoFormState, formData: FormData): Promise<CreateTodoFormState>{
    const todo = formData.get('todo');

    const validationResult = todoSchema.safeParse({todo});

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

    revalidatePath('/');
    
    return {
        errors: {},
        success: true
    }
}

export interface UpdateTodoFormState {
    errors: {
        todo?: string[];
        _form?: string[];
    };
    success?: boolean;
}
export async function updateTodo(id: number, formState: UpdateTodoFormState, formData: FormData): Promise<UpdateTodoFormState>{
    const todo = formData.get('todo');

    const validationResult = todoSchema.safeParse({todo});

    if(!validationResult.success){
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    try{
        await db.todos.update({
            where: {
                id
            },
            data: {
                todo: validationResult.data.todo
            }
        });

    }catch(err){
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

    revalidatePath(`/`)
    revalidatePath(`/todos/${id}`);

    return {
        errors: {},
        success: true
    }
}

export interface UpdateTodoStatusFormState {
    success?: boolean;
    isCompleted?: boolean;
}

export async function updateTodoStatus( todoData: { id: Todos['id']; isCompleted: Todos['isCompleted'] }){
    const { id, isCompleted } = todoData;
   
    try{
        await db.todos.update({
            where: {
                id
            },
            data: {
                isCompleted: !isCompleted
            }
        });


    }catch(err: any) {
        return {
            error: 'Something went wrong'
        }
    }

    revalidatePath('/');
    revalidatePath(`/todos/${id}`)
}

export async function deleteTodo(id: Todos['id']){
    try{
        await db.todos.delete({
            where: {
                id
            }
        })
    }catch(err){
        return {
            error: 'Something went wrong'
        }
    }

    revalidatePath(`/`);
    revalidatePath(`/todos/${id}`);
    redirect('/');
}