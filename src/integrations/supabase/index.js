import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

const fromSupabase = async (query) => {
    try {
        const { data, error } = await query;
        if (error) {
            console.error(error);
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
};

/* supabase integration types

table: users
    id: number
    username: string
    email: string

table: posts
    id: number
    user_id: number // foreign key to users
    content: string

table: comments
    id: number
    post_id: number // foreign key to posts
    comment: string

table: likes
    id: number
    user_id: number // foreign key to users
    post_id: number // foreign key to posts

table: profiles
    id: number
    user_id: number // foreign key to users
    bio: string

table: followers
    id: number
    user_id: number // foreign key to users
    follower_id: number // foreign key to users

table: messages
    id: number
    sender_id: number // foreign key to users
    receiver_id: number // foreign key to users
    content: string

table: notifications
    id: number
    user_id: number // foreign key to users
    message: string
    read: boolean

table: events
    id: number
    name: string
    date: string
    location: string

table: event_registrations
    id: number
    event_id: number // foreign key to events
    user_id: number // foreign key to users

*/

// Hooks for users table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([{ username: newUser.username, email: newUser.email }])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update({ username: updatedUser.username, email: updatedUser.email }).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for posts table
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const usePost = (id) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => fromSupabase(supabase.from('posts').select('*').eq('id', id).single()),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([{ user_id: newPost.user_id, content: newPost.content }])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPost) => fromSupabase(supabase.from('posts').update({ user_id: updatedPost.user_id, content: updatedPost.content }).eq('id', updatedPost.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('posts').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([{ post_id: newComment.post_id, comment: newComment.comment }])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update({ post_id: updatedComment.post_id, comment: updatedComment.comment }).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for likes table
export const useLikes = () => useQuery({
    queryKey: ['likes'],
    queryFn: () => fromSupabase(supabase.from('likes').select('*')),
});

export const useLike = (id) => useQuery({
    queryKey: ['likes', id],
    queryFn: () => fromSupabase(supabase.from('likes').select('*').eq('id', id).single()),
});

export const useAddLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newLike) => fromSupabase(supabase.from('likes').insert([{ user_id: newLike.user_id, post_id: newLike.post_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        },
    });
};

export const useDeleteLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('likes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        },
    });
};

// Hooks for profiles table
export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*')),
});

export const useProfile = (id) => useQuery({
    queryKey: ['profiles', id],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*').eq('id', id).single()),
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profiles').insert([{ user_id: newProfile.user_id, bio: newProfile.bio }])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProfile) => fromSupabase(supabase.from('profiles').update({ user_id: updatedProfile.user_id, bio: updatedProfile.bio }).eq('id', updatedProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('profiles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

// Hooks for followers table
export const useFollowers = () => useQuery({
    queryKey: ['followers'],
    queryFn: () => fromSupabase(supabase.from('followers').select('*')),
});

export const useFollower = (id) => useQuery({
    queryKey: ['followers', id],
    queryFn: () => fromSupabase(supabase.from('followers').select('*').eq('id', id).single()),
});

export const useAddFollower = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFollower) => fromSupabase(supabase.from('followers').insert([{ user_id: newFollower.user_id, follower_id: newFollower.follower_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('followers');
        },
    });
};

export const useDeleteFollower = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('followers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('followers');
        },
    });
};

// Hooks for messages table
export const useMessages = () => useQuery({
    queryKey: ['messages'],
    queryFn: () => fromSupabase(supabase.from('messages').select('*')),
});

export const useMessage = (id) => useQuery({
    queryKey: ['messages', id],
    queryFn: () => fromSupabase(supabase.from('messages').select('*').eq('id', id).single()),
});

export const useAddMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('messages').insert([{ sender_id: newMessage.sender_id, receiver_id: newMessage.receiver_id, content: newMessage.content }])),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};

export const useUpdateMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMessage) => fromSupabase(supabase.from('messages').update({ sender_id: updatedMessage.sender_id, receiver_id: updatedMessage.receiver_id, content: updatedMessage.content }).eq('id', updatedMessage.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('messages').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};

// Hooks for notifications table
export const useNotifications = () => useQuery({
    queryKey: ['notifications'],
    queryFn: () => fromSupabase(supabase.from('notifications').select('*')),
});

export const useNotification = (id) => useQuery({
    queryKey: ['notifications', id],
    queryFn: () => fromSupabase(supabase.from('notifications').select('*').eq('id', id).single()),
});

export const useAddNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNotification) => fromSupabase(supabase.from('notifications').insert([{ user_id: newNotification.user_id, message: newNotification.message, read: newNotification.read }])),
        onSuccess: () => {
            queryClient.invalidateQueries('notifications');
        },
    });
};

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedNotification) => fromSupabase(supabase.from('notifications').update({ user_id: updatedNotification.user_id, message: updatedNotification.message, read: updatedNotification.read }).eq('id', updatedNotification.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('notifications');
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('notifications').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('notifications');
        },
    });
};

// Hooks for events table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['events', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([{ name: newEvent.name, date: newEvent.date, location: newEvent.location }])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update({ name: updatedEvent.name, date: updatedEvent.date, location: updatedEvent.location }).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for event_registrations table
export const useEventRegistrations = () => useQuery({
    queryKey: ['event_registrations'],
    queryFn: () => fromSupabase(supabase.from('event_registrations').select('*')),
});

export const useEventRegistration = (id) => useQuery({
    queryKey: ['event_registrations', id],
    queryFn: () => fromSupabase(supabase.from('event_registrations').select('*').eq('id', id).single()),
});

export const useAddEventRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEventRegistration) => fromSupabase(supabase.from('event_registrations').insert([{ event_id: newEventRegistration.event_id, user_id: newEventRegistration.user_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('event_registrations');
        },
    });
};

export const useDeleteEventRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_registrations').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('event_registrations');
        },
    });
};