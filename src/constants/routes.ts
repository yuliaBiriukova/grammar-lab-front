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
        }
    }
}