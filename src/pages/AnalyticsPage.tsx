import { useEffect } from "react";
import { Users, UserCheck, UserX } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { UserGrowthChart } from "../features/analytics/UserGrowthChart";
import { UserStatusChart } from "../features/analytics/UserStatusChart";

export const AnalyticsPage = () => {
    const { users, fetchUsers } = useUserStore();

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, [users.length, fetchUsers]);

    const totalUsers = users.length || 50; // Fallback to mock count if not loaded
    const activeUsers = users.filter(u => u.status === 'Active').length || 35;
    const inactiveUsers = users.filter(u => u.status === 'Inactive').length || 15;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight dark:text-white">Analytics Overview</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Key metrics and performance indicators for your user base.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-gray-500">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                        <p className="text-xs text-gray-500">Currently active on platform</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
                        <UserX className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inactiveUsers}</div>
                        <p className="text-xs text-gray-500">No activity in 30 days</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <UserGrowthChart />
                <UserStatusChart />
            </div>
        </div>
    );
};
