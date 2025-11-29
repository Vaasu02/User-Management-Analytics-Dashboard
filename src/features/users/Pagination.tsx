import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useUserStore } from "../../store/useUserStore";

export const Pagination = () => {
    const { pagination, setPage } = useUserStore();
    const { page, limit, total } = pagination;

    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    if (total === 0) return null;

    return (
        <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{start}</span> to{" "}
                <span className="font-medium">{end}</span> of{" "}
                <span className="font-medium">{total}</span> results
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                <div className="text-sm font-medium dark:text-gray-300">
                    Page {page} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
