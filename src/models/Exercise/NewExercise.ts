import {ExerciseType} from "./ExerciseType";

export interface NewExercise {
    type: ExerciseType;
    task: string;
    answer: string;
    topicId: number;
}