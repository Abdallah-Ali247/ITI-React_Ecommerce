import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, createProduct, updateProduct, removeProduct } from "../redux/slices/adminProductSlice";

const AdminProductManager = () => {
    const dispatch = useDispatch();
    const { adminProducts } = useSelector((state) => state.adminProducts);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", image: "" });
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


    const handleAddProduct = () => {
        dispatch(createProduct(newProduct));

        // Reset form including image field
        setNewProduct({ name: "", price: "", category: "", image: null });
    };


    const handleEdit = (product) => {
        setEditData(product);
        setShowModal(true);
    };

    const handleSaveChanges = () => {
        dispatch(updateProduct({ id: editData.id, updatedProduct: editData }));
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <h2>Admin - Manage Products</h2>

            {/* Add Product Form */}
            <div className="mb-4">
                <h5>Add Product</h5>

                <input type="text" className="form-control mb-2" placeholder="Name" value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />

                <input type="number" className="form-control mb-2" placeholder="Price" value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />

                <input type="text" className="form-control mb-2" placeholder="Category" value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />

      
                <input
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const imagePath = `/products/${file.name}`; // Store the file path
                            setNewProduct({ ...newProduct, image: imagePath });
                        }
                    }}
                />

                <button className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
            </div>

            {/* Product List */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td><img src={product.image} alt="" width="50" /></td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeProduct(product.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Product Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Product</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-2" value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                                <input type="number" className="form-control mb-2" value={editData.price}
                                    onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                                <input type="text" className="form-control mb-2" value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })} />

                
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imagePath = `/products/${file.name}`;  
                                            setEditData({ ...editData, image: imagePath });
                                        }
                                    }}
                                />

                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductManager;










