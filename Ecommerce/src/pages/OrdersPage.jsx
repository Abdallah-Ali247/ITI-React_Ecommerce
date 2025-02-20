import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, fetchAllOrders, approveOrder } from "../redux/slices/orderSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "seller" || user?.role === "admin") {
      dispatch(fetchAllOrders());
    } else if (user) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const handleApprove = (orderId) => {
    dispatch(approveOrder(orderId));
  };

  if (!user) return <p>Please log in to view orders.</p>;
  if (orders.length === 0) return <p>No orders available.</p>;

  return (
    <div className="container mt-5">
      <h2>Orders</h2>
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              Order #{order.id} - {order.items.length} items - <strong>{order.status}</strong>
            </div>
            {user.role === "seller" && order.status === "pending" && (
              <button className="btn btn-success" onClick={() => handleApprove(order.id)}>
                Approve
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;




// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrders, approveOrder, rejectOrder } from "../redux/slices/orderSlice";
// import { Table, Button, Spinner } from "react-bootstrap";

// const OrdersPage = () => {
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.orders);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   if (loading) return <Spinner animation="border" />;
//   if (error) return <p className="text-danger">Error: {error}</p>;

//   // Filter orders to show only those containing the seller's products
//   const sellerOrders = orders.filter(order =>
//     order.items.some(item => item.sellerId === user.id)
//   );

//   return (
//     <div className="container mt-4">
//       <h2>Orders Management</h2>
//       {sellerOrders.length === 0 ? (
//         <p>No orders for your products yet.</p>
//       ) : (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Products</th>
//               <th>Total Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sellerOrders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>
//                   {order.items.map((item) => (
//                     <div key={item.id}>
//                       {item.name} (x{item.quantity})
//                     </div>
//                   ))}
//                 </td>
//                 <td>${order.totalPrice}</td>
//                 <td>{order.status}</td>
//                 <td>
//                   {order.status === "pending" && (
//                     <>
//                       <Button variant="success" onClick={() => dispatch(approveOrder(order.id))} className="me-2">
//                         Approve
//                       </Button>
//                       <Button variant="danger" onClick={() => dispatch(rejectOrder(order.id))}>
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;
