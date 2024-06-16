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

table: foos
    id: number
    title: string

table: bars
    id: number
    foo_id: number // foreign key to foos

table: bazs
    id: number
    name: string
    bar_id: number // foreign key to bars

*/

// Hooks for foos table
export const useFoos = () => useQuery({
    queryKey: ['foos'],
    queryFn: () => fromSupabase(supabase.from('foos').select('*')),
});

export const useFoo = (id) => useQuery({
    queryKey: ['foos', id],
    queryFn: () => fromSupabase(supabase.from('foos').select('*').eq('id', id).single()),
});

export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(supabase.from('foos').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foos');
        },
    });
};

export const useUpdateFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedFoo) => fromSupabase(supabase.from('foos').update({ title: updatedFoo.title }).eq('id', updatedFoo.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('foos');
        },
    });
};

export const useDeleteFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('foos').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('foos');
        },
    });
};

// Hooks for bars table
export const useBars = () => useQuery({
    queryKey: ['bars'],
    queryFn: () => fromSupabase(supabase.from('bars').select('*')),
});

export const useBar = (id) => useQuery({
    queryKey: ['bars', id],
    queryFn: () => fromSupabase(supabase.from('bars').select('*').eq('id', id).single()),
});

export const useAddBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBar) => fromSupabase(supabase.from('bars').insert([{ foo_id: newBar.foo_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('bars');
        },
    });
};

export const useUpdateBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedBar) => fromSupabase(supabase.from('bars').update({ foo_id: updatedBar.foo_id }).eq('id', updatedBar.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('bars');
        },
    });
};

export const useDeleteBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('bars').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('bars');
        },
    });
};

// Hooks for bazs table
export const useBazs = () => useQuery({
    queryKey: ['bazs'],
    queryFn: () => fromSupabase(supabase.from('bazs').select('*')),
});

export const useBaz = (id) => useQuery({
    queryKey: ['bazs', id],
    queryFn: () => fromSupabase(supabase.from('bazs').select('*').eq('id', id).single()),
});

export const useAddBaz = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBaz) => fromSupabase(supabase.from('bazs').insert([{ name: newBaz.name, bar_id: newBaz.bar_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('bazs');
        },
    });
};

export const useUpdateBaz = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedBaz) => fromSupabase(supabase.from('bazs').update({ name: updatedBaz.name, bar_id: updatedBaz.bar_id }).eq('id', updatedBaz.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('bazs');
        },
    });
};

export const useDeleteBaz = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('bazs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('bazs');
        },
    });
};