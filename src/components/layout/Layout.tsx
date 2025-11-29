import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, BarChart2, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useThemeStore } from '../../store/useThemeStore';
import { Button } from '../ui/button';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => (
    <Link
        to={href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-blue-600",
            isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        )}
    >
        <Icon className="h-4 w-4" />
        {label}
    </Link>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useThemeStore();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] dark:bg-gray-950">
            <div className="hidden border-r border-gray-200 bg-gray-50/40 lg:block dark:bg-gray-900 dark:border-gray-800">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b border-gray-200 px-6 dark:border-gray-800">
                        <Link to="/" className="flex items-center gap-2 font-semibold dark:text-white">
                            <LayoutDashboard className="h-6 w-6 text-blue-600" />
                            <span className="">AdminDash</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <SidebarItem
                                icon={Users}
                                label="Users"
                                href="/users"
                                isActive={location.pathname.startsWith('/users')}
                            />
                            <SidebarItem
                                icon={BarChart2}
                                label="Analytics"
                                href="/analytics"
                                isActive={location.pathname.startsWith('/analytics')}
                            />
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-gray-200 bg-gray-50/40 px-6 dark:bg-gray-900 dark:border-gray-800">
                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {location.pathname.startsWith('/users') ? 'User Management' :
                                location.pathname.startsWith('/analytics') ? 'Analytics Overview' : 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            AD
                        </div>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white dark:bg-gray-950">
                    {children}
                </main>
            </div>
        </div>
    );
};
