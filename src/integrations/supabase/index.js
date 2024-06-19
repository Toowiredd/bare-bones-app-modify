import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### persistent_counts

| name    | type        | format | required |
|---------|-------------|--------|----------|
| id      | int8        | number | true     |
| count   | int8        | number | true     |

### another_table

| name    | type        | format | required |
|---------|-------------|--------|----------|
| id      | int8        | number | true     |
| name    | text        | string | true     |
| value   | int8        | number | true     |

*/

export const usePersistentCounts = () => useQuery({
    queryKey: ['persistent_counts'],
    queryFn: () => fromSupabase(supabase.from('persistent_counts').select('*')),
});

export const useAddPersistentCount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCount) => fromSupabase(supabase.from('persistent_counts').insert([newCount])),
        onSuccess: () => {
            queryClient.invalidateQueries('persistent_counts');
        },
    });
};

export const useUpdatePersistentCount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCount) => fromSupabase(supabase.from('persistent_counts').update(updatedCount).eq('id', updatedCount.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('persistent_counts');
        },
    });
};

export const useDeletePersistentCount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('persistent_counts').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('persistent_counts');
        },
    });
};

export const useAnotherTable = () => useQuery({
    queryKey: ['another_table'],
    queryFn: () => fromSupabase(supabase.from('another_table').select('*')),
});

export const useAddAnotherTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEntry) => fromSupabase(supabase.from('another_table').insert([newEntry])),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};

export const useUpdateAnotherTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEntry) => fromSupabase(supabase.from('another_table').update(updatedEntry).eq('id', updatedEntry.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};

export const useDeleteAnotherTable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('another_table').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};