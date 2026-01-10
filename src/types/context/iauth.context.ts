import { IUser } from "../auth/iuser";

export default interface IAuthContextType {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string, callback?: () => void) => Promise<void>;
    logout: (callback?: () => void) => Promise<void>;
}
