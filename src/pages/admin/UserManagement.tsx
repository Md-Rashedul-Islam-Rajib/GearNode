import {
  useGetAllUsersQuery,
  useBlockUserMutation,
} from "@/redux/features/auth/authApi";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Bike from "@/components/loaders/Bike";
import { toast } from "sonner";
import { User } from "@/types/auth.types";

const UserManagement = () => {
  const { data, isLoading, error } = useGetAllUsersQuery(undefined);
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const users = data?.data;

  // State for tracking selected user
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    isBlocked: boolean;
  } | null>(null);

  const handleConfirmBlock = async () => {
    if (!selectedUser) return;

    try {
      await blockUser({
        id: selectedUser.id,
        isBlocked: !selectedUser.isBlocked,
      }).unwrap();
        toast.success(`User ${selectedUser.isBlocked ? "unblocked": "blocked"} successfully`);
    } catch (err) {
      console.error("Error updating user status:", err);
      toast.error("Failed to update user status. Please try again.");
    }

    setSelectedUser(null);
  };

  if (isLoading)
      return
    <div className="flex justify-center items-center">
              <Bike/>
          </div>;
  if (error)
    return <p className="text-center text-red-500">Failed to load users</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Avatar</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user?._id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full border"
                  />
                </td>
                <td className="py-3 px-6">{user?.name}</td>
                <td className="py-3 px-6">{user?.email}</td>
                <td className="py-3 px-6">
                  <Badge className="bg-blue-100 text-blue-600 px-3 py-1 text-xs">
                    {user?.role}
                  </Badge>
                </td>
                <td className="py-3 px-6">
                  {user?.isBlocked ? (
                    <Badge className="bg-red-100 text-red-600 px-3 py-1 text-xs">
                      Blocked
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-600 px-3 py-1 text-xs">
                      Active
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <ShimmerButton
                        className={`px-3 py-2 text-sm font-medium ${
                          user.isBlocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        onClick={() =>
                          setSelectedUser({
                            id: user?._id as string,
                            isBlocked: user?.isBlocked as boolean,
                          })
                        }
                        disabled={isBlocking}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </ShimmerButton>
                    </DialogTrigger>

                    {selectedUser && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {selectedUser.isBlocked ? "Unblock" : "Block"} User
                          </DialogTitle>
                        </DialogHeader>

                        <p className="text-gray-600">
                          Are you sure you want to{" "}
                          {selectedUser.isBlocked ? "unblock" : "block"} this
                          user?
                        </p>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedUser(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant={
                              selectedUser.isBlocked ? "secondary" : "destructive"
                            }
                            onClick={handleConfirmBlock}
                            disabled={isBlocking}
                          >
                            {selectedUser.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
