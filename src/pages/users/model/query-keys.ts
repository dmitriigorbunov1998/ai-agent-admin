import type {GetAdminUsersParams} from '@/pages/users/model/types.ts';

export const usersQueryKeys = {
    all: ['admin-users'] as const,

    lists: () => [
        ...usersQueryKeys.all,
        'list',
    ] as const,

    list: (params: GetAdminUsersParams) => [
        ...usersQueryKeys.lists(),
        params,
    ] as const,

    details: () => [
        ...usersQueryKeys.all,
        'detail',
    ] as const,

    detail: (userId: number) => [
        ...usersQueryKeys.details(),
        userId,
    ] as const,
}