"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster"
import BorrowerLayout from "./BorrowerLayout";
import CreateBorrowerModal from "./CreateBorrowerModal";

const BorrowerPage: React.FC = () => {
    const handleOnSubmit = (formData: { name: string; email: string; number: string; contactAddress: string }) => {
        // Handle form submission logic here, such as sending data to an API.
        console.log("Form submitted:", formData);
    };

    return (
        <BorrowerLayout>
            <CreateBorrowerModal onSubmit={handleOnSubmit} />
            <Toaster/>
        </BorrowerLayout>
    );
};

export default BorrowerPage;