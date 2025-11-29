import { useNavigate } from "react-router-dom";
import { Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useUserStore } from "../../store/useUserStore";
import type { User } from "../../types";

export const UsersTable = () => {
    const navigate = useNavigate();
    const { filteredUsers, pagination, isLoading, sort, setSort } = useUserStore();
    const { page, limit } = pagination;


    const paginatedUsers = filteredUsers.slice(
        (page - 1) * limit,
        page * limit
    );

    const renderSortIcon = (key: keyof User) => {
        if (sort.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
        return sort.direction === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    };

    const handleSort = (key: keyof User) => {
        setSort(key);
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Avatar</TableHead>
                        <TableHead
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('name')}
                        >
                            <div className="flex items-center">
                                Name
                                {renderSortIcon('name')}
                            </div>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('createdAt')}
                        >
                            <div className="flex items-center">
                                Created At
                                {renderSortIcon('createdAt')}
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full bg-gray-100"
                                    />
                                </TableCell>
                                <TableCell className="font-medium dark:text-white">{user.name}</TableCell>
                                <TableCell className="text-gray-500">{user.email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={user.status === "Active" ? "success" : "secondary"}
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => navigate(`/users/${user.id}`)}
                                    >
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
