

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Place an order
export const placeOrder = createAsyncThunk("orders/placeOrder", async ({ userId, cartItems }) => {
  const orderData = {
    userId,
    items: cartItems,
    status: "pending", // Default order status
    createdAt: new Date().toISOString(),
  };

  // Save order to db.json
  await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  // Clear the cart after order is placed
  for (let item of cartItems) {
    await fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" });
  }

  return orderData;
});

// Fetch orders for a user
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (userId) => {
  const response = await fetch(`http://localhost:5000/orders?userId=${userId}`);
  return response.json();
});

// Fetch all orders (for sellers/admin)
export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async () => {
  const response = await fetch("http://localhost:5000/orders");
  return response.json();
});

// Approve an order (for sellers/admin)
export const approveOrder = createAsyncThunk("orders/approveOrder", async (orderId) => {
  await fetch(`http://localhost:5000/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  });

  return orderId;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    })
    .addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(approveOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload ? { ...order, status: "approved" } : order
      );
    });
  },
});

export default orderSlice.reducer;


//***************************************** */


 