import { FormEvent } from "react";

export default interface IUseSignInHook {
  error: string | null;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (option: boolean) => void;
  formData: { username: string, password: string };
  handleSignIn: (event: FormEvent) => Promise<void>;
  handleInputChange: (element: React.ChangeEvent<HTMLInputElement>) => void;
};