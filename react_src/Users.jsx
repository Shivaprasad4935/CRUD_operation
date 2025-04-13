import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Use lazy to load the UserList component
const UserList = lazy(() =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                default: (props) => {
                    return (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn btn-success btn-sm">Update</Link>
                                            <button className="btn btn-danger btn-sm ml-2" onClick={() => props.handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    );
                },
            });
        }, 1000); 
    })
);

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001');
                setUsers(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteuser/${id}`)
            .then(res => {
                console.log(res);
                axios.get('http://localhost:3001')
                    .then(result => {
                        setUsers(result.data);
                    })
                    .catch(err => {
                        setError(err);
                    });
            })
            .catch(err => console.log(err));
    };

    if (error) {
        return (
            <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3 text-danger">
                    Error: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <div className="d-flex justify-content-between mb-3">
                    <h2>Users</h2>
                    <Link to="/create" className="btn btn-success">
                        ADD
                    </Link>
                </div>
                <Suspense fallback={
                    <div className="d-flex justify-content-center align-items-center">
                        Loading Users...
                    </div>
                }>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            Loading...
                        </div>
                    ) : (
                        <UserList users={users} handleDelete={handleDelete} />
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default Users;
