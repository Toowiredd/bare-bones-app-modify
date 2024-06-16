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

table: persistent_counts
    id: number
    count: number

table: history
    id: number
    type: string
    count: number
    timestamp: string

*/

// Hooks for persistent_counts table
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

// Hooks for history table
export const useHistory = () => useQuery({
    queryKey: ['history'],
    queryFn: () => fromSupabase(supabase.from('history').select('*')),
});

export const useAddHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newHistory) => fromSupabase(supabase.from('history').insert([newHistory])),
        onSuccess: () => {
            queryClient.invalidateQueries('history');
        },
    });
};

export const useUpdateHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedHistory) => fromSupabase(supabase.from('history').update(updatedHistory).eq('id', updatedHistory.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('history');
        },
    });
};

export const useDeleteHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('history').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('history');
        },
    });
};