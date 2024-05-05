'use client';

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function FormButton({children, className}: FormButtonProps){
    const {pending} = useFormStatus();
    return (
        <Button type="submit" color="primary" isLoading={pending} className={className}>
            {children}
        </Button>
    )
}