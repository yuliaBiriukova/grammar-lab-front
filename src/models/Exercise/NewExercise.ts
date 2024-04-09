import {ExerciseType} from "../../utils/enums/models/ExerciseType";

export interface NewExercise {
    type: ExerciseType;
    task: string;
    answer: string;
    topicId: number;
}