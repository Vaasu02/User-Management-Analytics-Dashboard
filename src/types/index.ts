export type UserStatus = 'Active' | 'Inactive';

export interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    avatar: string;
    createdAt: string; // ISO date string
}

export interface Activity {
    id: string;
    userId: string;
    action: string;
    timestamp: string;
}

export interface UserFilter {
    search: string;
    status: UserStatus | 'All';
}

export interface PaginationState {
    page: number;
    limit: number;
    total: number;
}

export interface SortConfig {
    key: keyof User | null;
    direction: 'asc' | 'desc';
}
