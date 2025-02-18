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
