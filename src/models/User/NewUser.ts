import {UserRole} from "./UserRole";

export interface NewUser {
    id?: string;
    email: string;
    password?: string;
    role: UserRole | undefined;
    firstName?: string;
    lastName?: string;
    levelId?: number;
}