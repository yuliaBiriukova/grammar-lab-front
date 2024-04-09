import {Level} from "./Level/Level";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    level: Level;
    roles: string[];
}