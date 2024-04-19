export const apiBaseUrl = process.env.REACT_APP_API_URL || '';

export const apiEndpoints = {
    account: {
        login: 'account/login',
        current: 'account/current',
    },
    users:{
        main: 'users',
        password: 'users/password',
        byId: (id: string) => `users/${id}`,
    },
    levels: {
        main: 'levels',
        byId: (id: number) => `levels/${id}`,
        topics: (id: number) => `levels/${id}/topics`,
    },
    topics: {
        main: 'topics',
        byId: (id: number) => `topics/${id}`,
        search: `topics/search`,
    },
    exercises: {
        main: 'exercises',
        byId: (id: number) => `exercises/${id}`,
    },
    testResults: {
        main: 'testresults',
        best: 'testresults/best',
        byId: (id: number) => `testresults/${id}`,
    },
}