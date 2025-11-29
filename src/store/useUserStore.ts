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

        await new Promise((resolve) => setTimeout(resolve, 800));


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
            pagination: { ...state.pagination, page: 1 }
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


    applyFilters: () => {
        const { users, filters, sort } = get();
        let result = [...users];


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
