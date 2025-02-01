import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
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
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { TOrder, TUpdateOrder } from "@/types/order.types";
import { TProduct } from "@/types/form.types";


const Orders = () => {
  const { data, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  console.log(data);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full mt-4" />
      </div>
    );
  }

  const orders: TOrder[] = data?.data || [];

  // Filter Orders Based on Status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Handle Status Update
  const handleStatusChange = async (orderId: string, newStatus: TUpdateOrder["status"]) => {
    try {
      await updateOrder({ id: orderId, data: {status: newStatus} }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      refetch(); // Refresh data
    } catch (error) {
      console.error(error)
      toast.error("Failed to update order status");
    }
  };

  // Handle Order Cancellation
  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrder({
        id: orderId,
        data: {isCancelled: true,}
      }).unwrap();
      toast.warning("Order has been cancelled.");
      refetch();
    } catch (error) {
      console.error(error)
      toast.error("Failed to cancel order");
    }
  };
  
  // Handle Order Deletion
  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder( orderId
      ).unwrap();
      toast.warning("Order has been deleted.");
      refetch();
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order List</h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-4">
          {["all", "pending", "processing", "shipped", "delivered"].map(
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
                <TableHead className="w-1/6">Product Name</TableHead>
                <TableHead className="w-1/4">Email</TableHead>
                <TableHead className="w-1/6 text-center">Quantity</TableHead>
                <TableHead className="w-1/6 text-center">
                  Total Price (BDT)
                </TableHead>
                <TableHead className="w-1/6 text-center">Status</TableHead>
                <TableHead className="w-1/6 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-100">
                    <TableCell className="truncate max-w-[120px]">
                      {(order?.product as TProduct)?.name}
                    </TableCell>
                    <TableCell className="truncate">{order.email}</TableCell>
                    <TableCell className="text-center">
                      {order.quantity}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-green-600">
                      {order.totalPrice!.toLocaleString()} BDT
                    </TableCell>

                    {/* Status Dropdown */}
                    <TableCell className="text-center">
                      <Select
                        value={order.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(order._id as string, newStatus as TUpdateOrder["status"])
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell className="flex gap-3 justify-center">
                      {!order.isCancelled && (
                        <Button
                          onClick={() => handleCancelOrder(order._id as string)}
                          variant="destructive"
                          disabled={order.isCancelled}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteOrder(order._id as string)}
                        variant="secondary"
                        disabled={deleting}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
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

export default Orders;

