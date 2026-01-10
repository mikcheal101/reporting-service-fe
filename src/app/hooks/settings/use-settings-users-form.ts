// app/hooks/settings/use-settings-users-form.ts
"use client";

import { IUser } from "@/types/auth/iuser";
import { useEffect, useState } from "react";
import useCreateUser from "../user/use-create-user";
import useUpdateUser from "../user/use-update-user";

const emptyForm: IUser = {
    id: 0,
    fullName: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
};

type UseSettingsUsersForm = {
    selectedUser: IUser | null;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const useSettingsUsersForm = ({ selectedUser, setSelectedUser, setIsSheetOpen }: UseSettingsUsersForm) => {

    const [form, setForm] = useState<IUser>(emptyForm);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { mutate: createUser } = useCreateUser();
    const { mutate: updateUser } = useUpdateUser();

    useEffect(() => {
        if (!selectedUser) return;
        setForm({ ...selectedUser });
    }, [selectedUser]);

    const resetForm = () => setForm(emptyForm);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = (event?: React.FormEvent) => {
        event?.preventDefault();

        if (form.id > 0) updateUser(form);
        else createUser(form);

        resetForm();
        setSelectedUser(null);
        setIsSheetOpen(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((previousState: IUser) => ({
            ...previousState,
            [name]: value,
        }));
    };

    return {
        form,
        showPassword,

        resetForm,
        handleSubmit,
        handleInputChange,
        togglePasswordVisibility,
    };
};

export default useSettingsUsersForm;