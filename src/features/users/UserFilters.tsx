import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useUserStore } from "../../store/useUserStore";
import { useDebounce } from "../../hooks/useDebounce";

export const UserFilters = () => {
    const { filters, setFilter } = useUserStore();
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        setFilter("search", debouncedSearch);
    }, [debouncedSearch, setFilter]);

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search users..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <select
                    className="h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    value={filters.status}
                    onChange={(e) => setFilter("status", e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
};
