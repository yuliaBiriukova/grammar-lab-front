import {ExerciseType} from "../../utils/enums/models/ExerciseType";

export interface Exercise {
    id: number;
    type: ExerciseType;
    task: string;
    answer: string;
    topicId: number;
}