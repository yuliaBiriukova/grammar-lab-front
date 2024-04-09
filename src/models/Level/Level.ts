import {Topic} from "../Topic/Topic";

export interface Level {
    id: number;
    code: string;
    name: string;
    topics?: Topic[];
}