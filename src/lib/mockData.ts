import type { User, Activity } from '../types';

const NAMES = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Evan Wright',
    'Fiona Gallagher', 'George Martin', 'Hannah Lee', 'Ian Somerhalder', 'Julia Roberts',
    'Kevin Hart', 'Laura Croft', 'Mike Ross', 'Natalie Portman', 'Oliver Queen',
    'Peter Parker', 'Quinn Fabray', 'Rachel Green', 'Steve Rogers', 'Tony Stark'
];

const STATUSES: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];

export const generateMockUsers = (count: number = 50): User[] => {
    return Array.from({ length: count }, (_, i) => {
        const name = NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : '');
        const firstName = name.split(' ')[0].toLowerCase();
        return {
            id: `user-${i + 1}`,
            name,
            email: `${firstName}.${i + 1}@example.com`,
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        };
    });
};

export const generateMockActivities = (userId: string, count: number = 5): Activity[] => {
    const ACTIONS = ['Logged in', 'Updated profile', 'Viewed dashboard', 'Downloaded report', 'Changed password'];
    return Array.from({ length: count }, (_, i) => ({
        id: `act-${userId}-${i}`,
        userId,
        action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
    }));
};

export const MOCK_USERS = generateMockUsers(50);
