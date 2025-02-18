// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   orders: [],
// };

// const orderSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     addOrder: (state, action) => {
//       state.orders.push(action.payload);
//     },
//     updateOrder: (state, action) => {
//       const index = state.orders.findIndex(order => order.id === action.payload.id);
//       if (index !== -1) {
//         state.orders[index] = action.payload;
//       }
//     },
//   },
// });

// export const { addOrder, updateOrder } = orderSlice.actions;
// export default orderSlice.reducer; // ✅ Ensure default export



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

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
  },
});

export default orderSlice.reducer;
