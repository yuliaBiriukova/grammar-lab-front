export const apiBaseUrl = process.env.REACT_APP_API_URL || '';

export const apiEndpoints = {
    account: {
        login: 'account/login',
        current: 'account/current',
    },
    users:{
        main: 'users',
        password: 'users/password'
    },
    levels: {
        main: 'levels',
        byId: (id: number) => `levels/${id}`,
        topics: (id: number) => `levels/${id}/topics`,
    },
    topics: {
        main: 'topics',
        byId: (id: number) => `topics/${id}`,
        search: (query: string) => `topics/search?query=${encodeURIComponent(query)}`,
    },
    exercises: {
        main: 'exercises',
        byId: (id: number) => `exercises/${id}`,
    },
    completedTests: {
        main: 'completedTests',
        best: 'completedTests/best',
        byId: (id: number) => `completedTests/${id}`,
    },
}