// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, deleteUser, changeUserRole } from "../redux/slices/userSlice";

// const AdminPanel = () => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.users);
//   const [selectedRole, setSelectedRole] = useState({});

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleRoleChange = (id) => {
//     dispatch(changeUserRole({ id, newRole: selectedRole[id] }));
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Admin Panel - User Management</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <select
//                   value={selectedRole[user.id] || user.role}
//                   onChange={(e) => setSelectedRole({ ...selectedRole, [user.id]: e.target.value })}
//                 >
//                   <option value="user">User</option>
//                   <option value="seller">Seller</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 <button className="btn btn-sm btn-primary ms-2" onClick={() => handleRoleChange(user.id)}>
//                   Change
//                 </button>
//               </td>
//               <td>
//                 <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, editUser } from "../redux/slices/userSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [editData, setEditData] = useState(null); // Store selected user for editing
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditData(user);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    dispatch(editUser({ id: editData.id, updatedUser: editData }));
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel - User Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <label>Role:</label>
                <select
                  className="form-control"
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
