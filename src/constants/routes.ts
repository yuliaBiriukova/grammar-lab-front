export const routes = {
    undefined: '*',
    home: '/',
    login: '/login',
    levels: {
        view: {
            path: '/levels/:id',
            url: (id: number) => `/levels/${id}`
        },
        edit: {
            path: '/levels/:id/edit',
            url: (id: number) => `/levels/${id}/edit`
        },
        new: '/levels/new',
    }
}