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
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

/* supabase integration types

table: persistent_counts
    id: number
    count: number

table: another_table
    id: number
    name: string
    description: string

*/

// Hooks for persistent_counts table
export const usePersistentCounts = () => useQuery({
    queryKey: ['persistent_counts'],
    queryFn: () => fromSupabase(supabase.from('persistent_counts').select('*')),
});

export const usePersistentCount = (id) => useQuery({
    queryKey: ['persistent_counts', id],
    queryFn: () => fromSupabase(supabase.from('persistent_counts').select('*').eq('id', id).single()),
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

// Hooks for another_table table
export const useAnotherTable = () => useQuery({
    queryKey: ['another_table'],
    queryFn: () => fromSupabase(supabase.from('another_table').select('*')),
});

export const useAnotherTableItem = (id) => useQuery({
    queryKey: ['another_table', id],
    queryFn: () => fromSupabase(supabase.from('another_table').select('*').eq('id', id).single()),
});

export const useAddAnotherTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('another_table').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};

export const useUpdateAnotherTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedItem) => fromSupabase(supabase.from('another_table').update(updatedItem).eq('id', updatedItem.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};

export const useDeleteAnotherTableItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('another_table').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('another_table');
        },
    });
};