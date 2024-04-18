import {ExerciseType} from "./ExerciseType";

export interface Exercise {
    id: number;
    type: ExerciseType;
    task: string;
    answer: string;
    topicId: number;
}