import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
//import './App.css'

function Users () {
    const [users, setUsers] = useState([])
    const [showAll, setShowAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortDirection, setSortDirection] = useState('asc'); 
    const visibleRowCount = showAll ? users.length : 8;

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => {const sortedUsers = result.data.sort((a, b) => {
            const nameA = a.firstname.toLowerCase();
            const nameB = b.firstname.toLowerCase();
            if (nameA < nameB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setUsers(sortedUsers);
    })
        .catch(err => console.log(err))

    }, [sortDirection])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/' + id)
        .then(res => {
            console.log(res);
            window.alert("User deleted successfully!");
            window.location.reload()
        })
        .catch(errr => {
            console.log(errr)
            window.alert("Failed to delete user.");})
    }

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user => user.firstname.toLowerCase().includes(searchQuery.toLowerCase()));

    

    return(
        <>
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#6c757d' }}>
        <div className="w-65 rounded p-1" style={{ backgroundColor: '#6c757d' }}>         
           <h2 style={{ color: 'white',textAlign: 'center', position: 'sticky', top: 0, fontFamily: 'Times New Roman, Times, serif' }}>Users Information</h2>


            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to = "/create" style={{ marginTop:'10px',marginBottom:'15px' }}className = 'btn btn-outline-light'>Add</Link>
            <button style={{ marginBottom:'15px',marginTop:'10px',marginLeft: '12px' }} className='btn btn-outline-light ml-2' onClick={toggleSortDirection}>
                {sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            </button>
    <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by first name..."
        className="form-control mt-3"
        style={{ width: '400px', marginLeft:'890px',marginBottom: '15px', borderRadius: '20px' }}
    />
</div>

                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>First Name</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>Last Name</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>Email</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>Phone Number</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>Age</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>City</th>
                            <th style={{ backgroundColor: 'black', color: 'white' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: 'auto' }}>
                        {
                            filteredUsers.slice(0, visibleRowCount).map((user) => {
                                return <tr>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.firstname}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.lastname}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.email}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.phonenumber}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.age}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>{user.city}</td>
                                    <td style={{ backgroundColor: 'black', color: 'white' }}>
                                    <Link to = {`/update/${user._id}`} className = 'btn btn-outline-light'>Update</Link>
                                    
                                        <button style={{ marginLeft: '6px' }} className = 'btn btn-outline-danger' 
                                        onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {!showAll && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={toggleShowAll}>Show More</button>
                </div>
                )}
                </div>
                
            </div>
        </>
    )
}

export default Users;