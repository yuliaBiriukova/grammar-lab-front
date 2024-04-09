export interface TestResultExercise {
    id: number;
    task: string;
    answer: string;
    userAnswer: string;
    testResultId: number;
    isCorrect: boolean;
}