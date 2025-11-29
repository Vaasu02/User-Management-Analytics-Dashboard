import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useUserStore } from "../../store/useUserStore";

const COLORS = ["#22c55e", "#94a3b8"];

export const UserStatusChart = () => {
    const { users } = useUserStore();

    const activeCount = users.filter(u => u.status === 'Active').length;
    const inactiveCount = users.filter(u => u.status === 'Inactive').length;


    const data = [
        { name: "Active", value: activeCount || 35 },
        { name: "Inactive", value: inactiveCount || 15 },
    ];

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Active vs Inactive Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
