

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

interface FormData {
    name: string;
    email: string;
    number: string;
    contactAddress: string;
}

interface CreateBorrowerModalProps {
    onSubmit: (data: FormData) => void;
}

const CreateBorrowerModal: React.FC<CreateBorrowerModalProps> = ({ onSubmit }) => {
    const { toast } = useToast()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        number: '',
        contactAddress: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            onSubmit(formData);
            toast({
                title: "Borrower created successfully",
                description: "The Borrower was added successfully",
            });
        } catch (error) {
            toast({
                title: "Failed to create loan",
                description: "An error occurred while creating the loan.",
            });
        }finally{
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', email: '', number: '', contactAddress: '' });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Create Borrower
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Borrower</DialogTitle>
                    <DialogDescription>Fill in the details to create a new borrower.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        name="number"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        name="contactAddress"
                        type="text"
                        placeholder="Enter contact address"
                        value={formData.contactAddress}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 ml-2 rounded text-white ${
                                isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBorrowerModal;
