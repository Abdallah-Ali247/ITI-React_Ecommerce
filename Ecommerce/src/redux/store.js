// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import productReducer from "./slices/productSlice";
// import cartReducer from "./slices/cartSlice";
// import userReducer from "./slices/userSlice";
// import orderReducer from "./slices/orderSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     products: productReducer,
//     cart: cartReducer,
//     users: userReducer,
//     orders: orderReducer,
//   },
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,  
    cart: cartReducer,
    orders: orderReducer,
    users: userReducer,
  },
});

export default store;
