import {Topic} from "./Topic";

export interface Level {
    id: number;
    code: string;
    name: string;
    topics?: Topic[];
}