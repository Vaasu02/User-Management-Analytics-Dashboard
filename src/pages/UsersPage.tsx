import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { UserFilters } from "../features/users/UserFilters";
import { UsersTable } from "../features/users/UsersTable";
import { Pagination } from "../features/users/Pagination";

export const UsersPage = () => {
    const { fetchUsers } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight dark:text-white">Users</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage your team members and their account permissions here.
                </p>
            </div>

            <UserFilters />
            <UsersTable />
            <Pagination />
        </div>
    );
};
