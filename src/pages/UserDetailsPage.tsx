import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Calendar, Activity as ActivityIcon } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { EditUserModal } from "../features/users/EditUserModal";
import { generateMockActivities } from "../lib/mockData";
import type { Activity } from "../types";

export const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { users, fetchUsers } = useUserStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);

    // Ensure users are loaded (in case of direct link access)
    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, [users.length, fetchUsers]);

    const user = users.find((u) => u.id === id);

    useEffect(() => {
        if (user) {
            setActivities(generateMockActivities(user.id));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">User not found or loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/users")} className="dark:text-gray-300 dark:hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Users
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                {/* Profile Card */}
                <Card>
                    <CardContent className="flex flex-col items-center pt-6 text-center">
                        <div className="relative mb-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-24 w-24 rounded-full bg-gray-100 ring-4 ring-white shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0">
                                <Badge
                                    variant={user.status === "Active" ? "success" : "secondary"}
                                    className="px-2 py-0.5 text-xs"
                                >
                                    {user.status}
                                </Badge>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
                        <p className="text-gray-500 mb-6 dark:text-gray-400">{user.email}</p>

                        <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                            <div className="flex flex-col items-center gap-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-500">Joined</span>
                                <span className="text-sm font-medium">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-500">Email</span>
                                <span className="text-sm font-medium truncate w-full px-2">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <div className="w-full mt-6">
                            <Button className="w-full" onClick={() => setIsEditModalOpen(true)}>
                                Edit Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Section */}
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ActivityIcon className="h-5 w-5 text-blue-600" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {activities.map((activity, index) => (
                                    <div key={activity.id} className="flex gap-4">
                                        <div className="relative flex flex-col items-center">
                                            <div className="h-2 w-2 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                            {index !== activities.length - 1 && (
                                                <div className="h-full w-px bg-gray-200 my-1" />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 pb-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </div>
    );
};
