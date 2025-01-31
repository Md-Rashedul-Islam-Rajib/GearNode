import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAllOrdersQuery,
  useCancelOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TOrder } from "@/types/order.types";
import { toast } from "sonner";

const CustomerOrders = () => {
  const { data, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation(); // API Mutation for Canceling Order
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const user = useAppSelector(currentUser);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full mt-4" />
      </div>
    );
  }

  const allData: TOrder[] = data?.data || [];
  const orders = allData.filter((item) => item.email === user.email);

  // Filter Orders Based on Status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Handle Order Cancellation
  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrder({
        id: orderId,
        data: { isCancelled: true },
      }).unwrap();
      toast.warning("Order has been cancelled.");
      refetch();
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order List</h1>
        {/* Filter Buttons */}
        <div className="flex gap-3 mb-4">
          {["all", "processing", "pending", "shipped", "delivered"].map(
            (status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "default" : "outline"}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            )
          )}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">Product name</TableHead>
                <TableHead className="w-1/6">Email</TableHead>
                <TableHead className="w-1/6 text-center">Quantity</TableHead>
                <TableHead className="w-1/6 text-center">
                  Total Price (BDT)
                </TableHead>
                <TableHead className="w-1/6 text-center">Status</TableHead>
                <TableHead className="w-1/6 text-center">Date</TableHead>
                <TableHead className="w-1/6 text-center">Action</TableHead>{" "}
                {/* Added Action Column */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-100">
                    <TableCell className="truncate max-w-[120px]">
                      {order.product.name}
                    </TableCell>
                    <TableCell className="truncate">{order.email}</TableCell>
                    <TableCell className="text-center">
                      {order.quantity}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-green-600">
                      {order?.totalPrice!.toLocaleString()} BDT
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`capitalize ${
                          order?.status === "pending"
                            ? "bg-red-600 text-white"
                            : order?.status === "processing"
                            ? "bg-yellow-500 text-gray-800"
                            : order?.status === "shipped"
                            ? "bg-blue-900 text-white"
                            : order?.status === "delivered"
                            ? "bg-emerald-900 text-white"
                            : ""
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    {/* Cancel Button */}
                    <TableCell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={order.isCancelled} // Disable if already cancelled
                      >
                        {order.isCancelled ? "Cancelled" : "Cancel"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CustomerOrders;
