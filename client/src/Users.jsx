import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Users () {
    const [users, setUsers] = useState([])
    const [showAll, setShowAll] = useState(false);
    const visibleRowCount = showAll ? users.length : 8;

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return(
        <>
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-4">
            <Link to = "/create" className = 'btn btn-outline-info'>Add</Link>
            
                <table className="table" style={{ width: '100%', tableLayout: 'fixed', background: 'white' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.slice(0, visibleRowCount).map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.city}</td>
                                    <td>
                                    <Link to = {`/update/${user._id}`} className = 'btn btn-outline-info'>Update</Link>
                                    
                                        <button className = 'btn btn-outline-danger' 
                                        onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {!showAll && (
                    <button onClick={toggleShowAll}>Show More</button>
                )}
                </div>
                
            </div>
        </>
    )
}

export default Users;