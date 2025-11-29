import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const data = [
    { name: "Mon", users: 12 },
    { name: "Tue", users: 19 },
    { name: "Wed", users: 15 },
    { name: "Thu", users: 25 },
    { name: "Fri", users: 32 },
    { name: "Sat", users: 45 },
    { name: "Sun", users: 38 },
];

export const UserGrowthChart = () => {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>User Signup Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={{ r: 4, fill: "#2563eb" }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
