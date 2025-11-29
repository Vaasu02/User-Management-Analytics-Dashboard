import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { User } from "../../types";
import { useUserStore } from "../../store/useUserStore";

const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    status: z.enum(["Active", "Inactive"]),
});

type UserFormData = z.infer<typeof userSchema>;

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
    const { updateUser } = useUserStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            status: user.status,
        },
    });

    // Reset form when user changes
    useEffect(() => {
        reset({
            name: user.name,
            email: user.email,
            status: user.status,
        });
    }, [user, reset]);

    const onSubmit = async (data: UserFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        updateUser(user.id, data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input {...register("name")} placeholder="John Doe" />
                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input {...register("email")} placeholder="john@example.com" />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                        {...register("status")}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && (
                        <p className="text-xs text-red-500">{errors.status.message}</p>
                    )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
