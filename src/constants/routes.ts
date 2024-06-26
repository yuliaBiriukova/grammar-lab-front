export const routes = {
    undefined: '*',
    home: '/',
    login: '/login',
    levels: {
        view: {
            path: '/levels/:levelId',
            url: (id: number) => `/levels/${id}`
        },
        edit: {
            path: '/levels/:levelId/edit',
            url: (id: number) => `/levels/${id}/edit`
        },
        new: '/levels/new',
    },
    topics: {
        view: {
            path: '/topics/:id',
            url: (id: number) => `/topics/${id}`
        },
        new: {
            path: '/levels/:levelId/topics/new',
            url: (levelId: number) => `/levels/${levelId}/topics/new`
        },
        edit: {
            path: '/topics/:id/edit',
            url: (id: number) => `/topics/${id}/edit`
        },
        test: {
            path: '/topics/:topicId/test',
            url: (topicId: number) => `/topics/${topicId}/test`,
            result: {
                path: '/topics/:topicId/test/result',
                url: (topicId: number) => `/topics/${topicId}/test/result`,
            },
        },
        search: {
            main: '/topics/search',
            byQuery: (query: string) => `/topics/search?query=${query}`
        }
    },
    exercises: {
        list: {
            path: '/topics/:topicId/exercises',
            url: (topicId: number) => `/topics/${topicId}/exercises`
        },
        view: {
            path: '/exercises/:id',
            url: (id: number) => `/exercises/${id}`
        },
        new: {
            path: '/topics/:topicId/exercises/new',
            url: (topicId: number) => `/topics/${topicId}/exercises/new`
        },
        edit: {
            path: '/exercises/:id/edit',
            url: (id: number) => `/exercises/${id}/edit`
        },
    },
    testResults: {
        all: '/results/all',
        byLevel: {
            path: '/levels/:levelId/results',
            url: (levelId: number) => `/levels/${levelId}/results`
        },
        byTopic: {
            path: '/topics/:topicId/results',
            url: (topicId: number) => `/topics/${topicId}/results`
        },
        view: {
            path: '/results/:id',
            url: (id: number) => `/results/${id}`
        },
    },
    account: '/account',
    users: {
        all: '/users',
        new: '/users/new',
        byRole: (role: any) => `/users?role=${role}`,
        edit: {
            path: '/users/:id/edit',
            url: (id: string) => `/users/${id}/edit`,
            password: {
                path: '/users/:id/edit/password',
                url: (id: string) => `/users/${id}/edit/password`
            },
        },
    }
}