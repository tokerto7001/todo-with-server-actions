"use client";

import { Button, Input } from "@nextui-org/react";
import { Todos } from "@prisma/client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "./form-button";

interface UpdateTodoFormProps {
  todo: Todos;
}

export default function UpdateTodoForm({ todo }: UpdateTodoFormProps) {
  const [formState, action] = useFormState(
    actions.updateTodo.bind(null, todo.id),
    { errors: {} }
  );

  return (
    <div className="w-96 flex flex-col container">
      <form action={action}>
        <Input
          name="todo"
          label="Todo"
          placeholder="Todo"
          defaultValue={todo.todo}
          className="max-md:w-[80%]"
        />
        {formState.errors.todo ? (
          <div className="text-red-900">{formState.errors.todo.join(", ")}</div>
        ) : null}
        {formState.errors._form ? (
          <div className="text-red-900">{formState.errors._form.join(", ")}</div>
        ) : null}
        <FormButton className="w-48 mt-5">
          Update Todo
        </FormButton>
      </form>
    </div>
  );
}
