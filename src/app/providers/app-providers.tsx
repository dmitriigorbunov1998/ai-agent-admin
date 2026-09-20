import type {PropsWithChildren} from 'react';

import {QueryProvider} from '@/app/providers/query-provider';

export function AppProviders({children}: PropsWithChildren) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}