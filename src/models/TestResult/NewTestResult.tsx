import {NewTestResultExercise} from "./NewTestResultExercise";

export interface NewTestResult {
    topicId: number;
    testResultExercises: NewTestResultExercise[];
}