'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import * as actions from '@/actions';
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { redirect } from "next/navigation";
import FormButton from "./form-button";

export default function CreateTodoForm(){
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const ref = useRef<HTMLFormElement | null>(null);

    const [formState, action] = useFormState(actions.createTodo, {errors: {}});

    useEffect(() => {
        console.log(formState)
        if(formState.success) {
            ref.current?.reset();
            onClose();
            redirect('/')
        }
    }, [formState, onClose])

    return (
            <>
              <Button onPress={onOpen} color="secondary">Create Todo</Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Create Todo</ModalHeader>
                      <ModalBody className='min-h-48'>
                        <form action={action}>
                            <Input 
                              name="todo"
                              label="Todo"
                              labelPlacement="outside"
                              placeholder="Todo"
                            />
                            {
                              formState.errors.todo ? <div className="text-red-900">{formState.errors.todo?.join(', ')}</div> : null
                            }
                            {
                                formState.errors._form ? <div>{formState.errors._form.join('')}</div> : null
                            }
                            <div className="flex justify-center mt-5">
                              <FormButton>Create Todo</FormButton>
                            </div>
                        </form>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          );
}