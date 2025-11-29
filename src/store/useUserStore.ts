import { create } from 'zustand';
import type { User, UserFilter, PaginationState, SortConfig } from '../types';
import { MOCK_USERS } from '../lib/mockData';

interface UserStore {
    users: User[];
    filteredUsers: User[];
    filters: UserFilter;
    pagination: PaginationState;
    sort: SortConfig;
    isLoading: boolean;

    // Actions
    fetchUsers: () => Promise<void>;
    setFilter: (key: keyof UserFilter, value: string) => void;
    setPage: (page: number) => void;
    setSort: (key: keyof User) => void;
    deleteUser: (id: string) => void;
    updateUser: (id: string, data: Partial<User>) => void;
    addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
    applyFilters: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    filteredUsers: [],
    isLoading: false,
    filters: {
        search: '',
        status: 'All',
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
    },
    sort: {
        key: null,
        direction: 'asc',
    },

    fetchUsers: async () => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In a real app, we might fetch from an API. 
        // Here we just load the mock data if it's empty, or keep existing state
        const currentUsers = get().users;
        const initialUsers = currentUsers.length > 0 ? currentUsers : MOCK_USERS;

        set({
            users: initialUsers,
            isLoading: false
        });
        get().applyFilters();
    },

    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value },
            pagination: { ...state.pagination, page: 1 } // Reset to page 1 on filter change
        }));
        get().applyFilters();
    },

    setPage: (page) => {
        set((state) => ({
            pagination: { ...state.pagination, page }
        }));
    },

    setSort: (key) => {
        set((state) => {
            const isAsc = state.sort.key === key && state.sort.direction === 'asc';
            return {
                sort: {
                    key,
                    direction: isAsc ? 'desc' : 'asc',
                }
            };
        });
        get().applyFilters();
    },

    deleteUser: (id) => {
        set((state) => ({
            users: state.users.filter((u) => u.id !== id)
        }));
        get().applyFilters();
    },

    updateUser: (id, data) => {
        set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u))
        }));
        get().applyFilters();
    },

    addUser: (userData) => {
        const newUser: User = {
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...userData,
        };
        set((state) => ({
            users: [newUser, ...state.users]
        }));
        get().applyFilters();
    },

    // Helper to apply filters locally
    applyFilters: () => {
        const { users, filters, sort } = get();
        let result = [...users];

        // 1. Filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(searchLower) ||
                    u.email.toLowerCase().includes(searchLower)
            );
        }

        if (filters.status !== 'All') {
            result = result.filter((u) => u.status === filters.status);
        }

        // 2. Sort
        if (sort.key) {
            result.sort((a, b) => {
                const aValue = a[sort.key!];
                const bValue = b[sort.key!];

                if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        set((state) => ({
            filteredUsers: result,
            pagination: { ...state.pagination, total: result.length }
        }));
    },
}));
