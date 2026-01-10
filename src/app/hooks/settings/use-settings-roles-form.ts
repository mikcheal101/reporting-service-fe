// app/hooks/settings/use-settings-roles-form.ts
"use client";

import { IRole } from "@/types/auth/irole";
import useUpdateUserRole from "./use-update-user-role";
import useCreateUserRole from "./use-create-user-role";

type UseSettingsRolesFormProps = {
  form: IRole;
  setForm: React.Dispatch<React.SetStateAction<IRole>>;
  setIsRoleFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
  isNewForm: () => boolean;
};

const useSettingsRolesForm = ({ isNewForm, resetForm, form, setForm, setIsRoleFormOpen }: UseSettingsRolesFormProps) => {

  const { mutate: createRole } = useCreateUserRole();
  const { mutate: updateRole } = useUpdateUserRole();

  const openForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsRoleFormOpen(true);
    resetForm();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previousState: IRole) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isNewForm()) {
      createRole(form, {
        onSuccess: (): void => {
          setIsRoleFormOpen(false);
          resetForm();
        }
      });
    } else {
      updateRole(form, {
        onSuccess: () => {
          setIsRoleFormOpen(false);
          resetForm();
        }
      });
    }
  };

  return {
    openForm,
    handleInputChange,
    handleSubmit,
  };
};

export default useSettingsRolesForm;