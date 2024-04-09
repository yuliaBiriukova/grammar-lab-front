import {TestResultExercise} from "./TestResultExercise";

export interface TestResult {
    id: number;
    percentage: number;
    dateCompleted: Date;
    topicId: number;
    topicName: string;
    testResultExercises: TestResultExercise[];
}