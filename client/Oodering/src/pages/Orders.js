import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../config";
import { format, parseISO, isValid } from "date-fns";
import "./Orders.css"; 
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [completedOrderStatus, setCompletedOrderStatus] = useState({});
  const [canceledOrderStatus, setCanceledOrderStatus] = useState({});
  const [
    isCompleteConfirmationDialogOpen,
    setIsCompleteConfirmationDialogOpen,
  ] = useState(false);
  const [isCancelConfirmationDialogOpen, setIsCancelConfirmationDialogOpen] =
    useState(false);
  const [orderIdToComplete, setOrderIdToComplete] = useState(null);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);
  const ordersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const fetchOrders = async () => {
    try {
      const result = await axios.get(`${api}/product_order/get/order`);
      console.log("Fetched Orders:", result.data);

      // Sort orders based on creation time in descending order
      const sortedOrders = result.data.sort(
        (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
      );

      // Set the sorted orders
      setOrders(sortedOrders);

      // Retrieve completed order status from local storage
      const storedCompletedStatus =
        JSON.parse(localStorage.getItem("completedOrderStatus")) || {};
      setCompletedOrderStatus(storedCompletedStatus);

      // Retrieve canceled order status from local storage
      const storedCanceledStatus =
        JSON.parse(localStorage.getItem("canceledOrderStatus")) || {};
      setCanceledOrderStatus(storedCanceledStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = (orderId) => {
    // Open the completion confirmation dialog
    setOrderIdToComplete(orderId);
    setIsCompleteConfirmationDialogOpen(true);
  };

  const handleCancel = (orderId) => {
    // Open the cancel confirmation dialog
    setOrderIdToCancel(orderId);
    setIsCancelConfirmationDialogOpen(true);
  };

  const handleConfirmComplete = async () => {
    try {
      //await axios.put(`${api}/${orderIdToComplete}/st?newStatus=Completed`);
      await axios.put(`http://localhost:4204/product_order/${orderIdToComplete}/st?newStatus=Completed`);
      fetchOrders();

      // Update local state and local storage for completed order status
      setCompletedOrderStatus((prevStatus) => ({
        ...prevStatus,
        [orderIdToComplete]: true,
      }));
      localStorage.setItem(
        "completedOrderStatus",
        JSON.stringify({ ...completedOrderStatus, [orderIdToComplete]: true })
      );
    } catch (error) {
      console.error("Error completing order:", error);
    } finally {
      // Close the completion confirmation dialog
      setIsCompleteConfirmationDialogOpen(false);
      setOrderIdToComplete(null);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      // Update the order status in the backend
      //await axios.put(`${api}/${orderIdToCancel}/st?newStatus=Canceled`);
      await axios.put(`http://localhost:4204/product_order/${orderIdToCancel}/st?newStatus=Canceled`);
      fetchOrders();

      // Update local state and local storage for canceled order status
      setCanceledOrderStatus((prevStatus) => ({
        ...prevStatus,
        [orderIdToCancel]: true,
      }));
      localStorage.setItem(
        "canceledOrderStatus",
        JSON.stringify({ ...canceledOrderStatus, [orderIdToCancel]: true })
      );
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      // Close the cancel confirmation dialog
      setIsCancelConfirmationDialogOpen(false);
      setOrderIdToCancel(null);
    }
  };

  const handleCancelAction = () => {
    // Close the cancel confirmation dialog without canceling the order
    setIsCancelConfirmationDialogOpen(false);
    setIsCompleteConfirmationDialogOpen(false);
    setOrderIdToCancel(null);
  };

  return (
    <div className="orders-container">
      <h1 className="subtitle">Orders</h1>
      <TableContainer>
        <Table variant="simple" className="custom-table">
          <Thead>
            <Tr>
              <Th>Order Code</Th>
              <Th>Items</Th>
              <Th isNumeric>Total</Th>
              <Th>Actions</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentOrders.map((order) => (
              <Tr
                key={order.id}
                style={
                  canceledOrderStatus[order.id]
                    ? { textDecoration: "line-through" }
                    : {}
                }
              >
                <Td>{order.orderNumber}</Td>
                <Td>
                  {order.products.map((product) => (
                    <div key={product.id}>
                      {product.name} ({product.quantity})
                    </div>
                  ))}
                </Td>
                <Td isNumeric>{order.totalPrice}</Td>
                <Td>
                  {canceledOrderStatus[order.id] ? (
                    <Badge colorScheme="red">Canceled</Badge>
                  ) : completedOrderStatus[order.id] ? (
                    <Badge colorScheme="blue">Completed</Badge>
                  ) : (
                    <>
                      <Button
                        colorScheme="green"
                        onClick={() => handleComplete(order.id)}
                      >
                        Complete
                      </Button>{" "}
                      <Button
                        colorScheme="red"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Td>
                <Td>
                  {order.creationTime && isValid(parseISO(order.creationTime))
                    ? format(
                        parseISO(order.creationTime),
                        "yyyy-MM-dd | hh:mm a"
                      )
                    : "N/A"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <div className="pagination-container">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span>
          {" "}
          Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}{" "}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
        >
          Next Page
        </Button>
      </div>

      {/* Completion Confirmation Dialog */}
      <AlertDialog
        isOpen={isCompleteConfirmationDialogOpen}
        onClose={() => setIsCompleteConfirmationDialogOpen(false)}
        leastDestructiveRef={undefined}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Order Completion
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to mark this order as completed?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelAction}>Cancel</Button>
              <Button
                colorScheme="green"
                onClick={handleConfirmComplete}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        isOpen={isCancelConfirmationDialogOpen}
        onClose={() => setIsCancelConfirmationDialogOpen(false)}
        leastDestructiveRef={undefined}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Order Cancellation
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to cancel this order?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelAction}>Cancel</Button>
              <Button colorScheme="red" onClick={handleConfirmCancel} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Orders;
