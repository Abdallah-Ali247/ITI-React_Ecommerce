import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQuantity, removeCartItem } from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";



const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);




    useEffect(() => {
        if (user) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user]);

    const handleQuantityChange = (item, change) => {
        dispatch(updateCartQuantity({ itemId: item.id, newQuantity: item.quantity + change }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeCartItem(itemId));
    };



    const handleCheckout = async () => {
        await dispatch(placeOrder({ userId: user.id, cartItems }));
        dispatch(fetchCart(user.id));  
      };



    if (!user) return <p>Please log in to view your cart.</p>;
    if (cartItems.length === 0) return <p>Your cart is empty.</p>;

    // Calculate total price dynamically
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <ul className="list-group">
                {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={item.image} alt={item.name} width="50" className="me-3" />
                            {item.name} - ${item.price} x {item.quantity}
                        </div>
                        <div>
                            <button className="btn btn-success me-2" onClick={() => handleQuantityChange(item, 1)}>+</button>
                            <button className="btn btn-warning me-2" onClick={() => handleQuantityChange(item, -1)}>-</button>
                            <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h3 className="mt-4">Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="btn btn-primary mt-3" onClick={handleCheckout}>
                Checkout
            </button>
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








