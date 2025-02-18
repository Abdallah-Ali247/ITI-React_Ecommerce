import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart, clearCart, fetchCart } from "../redux/slices/cartSlice";

import {fetchCart } from "../redux/slices/cartSlice";


const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    // const handleRemove = (id) => {
    //     dispatch(removeFromCart(id));
    // };

    // const handleClearCart = () => {
    //     dispatch(clearCart());
    // };

    useEffect(() => {
        if (user) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user]);

    if (!user) return <p>Please log in to view your cart.</p>;
    if (cartItems.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <ul className="list-group">
                {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={item.image} alt={item.name} width="50" />
                            {item.name} - ${item.price} x {item.quantity}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    // return (
    //     <div className="container mt-5">
    //         <h2>Your Cart</h2>
    //         {cartItems.length === 0 ? (
    //             <p>Your cart is empty.</p>
    //         ) : (
    //             <div>
    //                 {cartItems.map((item) => (
    //                     <div key={item.id} className="d-flex justify-content-between align-items-center border p-3 mb-2">
    //                         <div>
    //                             <h5>{item.name}</h5>
    //                             <p>Price: ${item.price} | Quantity: {item.quantity}</p>
    //                         </div>
    //                         <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
    //                             Remove
    //                         </button>
    //                     </div>
    //                 ))}
    //                 <button className="btn btn-warning mt-3" onClick={handleClearCart}>
    //                     Clear Cart
    //                 </button>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default Cart;





