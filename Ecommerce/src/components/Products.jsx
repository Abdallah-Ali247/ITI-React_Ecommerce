// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productSlice";
// import { addToCart } from "../redux/slices/cartSlice";


// const Products = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleAddToCart = (product) => {
//     console.log("Adding to cart:", product);
//     dispatch(addToCart(product));
//   };

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mt-5">
//       <h2>Products</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-4">
//             <div className="card">
//               <img src={product.image} className="card-img-top" alt={product.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">${product.price}</p>
//                 <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    dispatch(addToCart({ product, userId: user.id }));
  };

  return (
    <div className="container mt-5 text-center products-con">
      <h2 className="m-5">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
