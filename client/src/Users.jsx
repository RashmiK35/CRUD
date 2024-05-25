import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
//import './App.css'

function Users () {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => {
                setUsers(result.data);
            })
            .catch(err => console.log(err));
    }, []);

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


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);

    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };


    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            const valueA = a[sortConfig.key]?.toString().toLowerCase();
            const valueB = b[sortConfig.key]?.toString().toLowerCase();
            if (valueA < valueB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });


    const filteredUsers = sortedUsers.filter(user =>  {
        const query = searchQuery.toLowerCase();
        return (
            user.firstname.toLowerCase().includes(query) ||
            user.lastname.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phonenumber.toLowerCase().includes(query) ||
            user.age.toString().includes(query) ||
            user.city.toLowerCase().includes(query)
        );
    });


    const rowsPerPage = 8;
    const paginatedUsers = filteredUsers.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const showMoreRows = () => {
        if ((currentPage + 1) * rowsPerPage < filteredUsers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '▲▼';
    };
    
    return(
        <>
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#CADCFC' }}>
        <div className="w-65 rounded p-1" style={{ backgroundColor: '#CADCFC' }}>         
           <h2 style={{ color: 'black',textAlign: 'center', position: 'sticky', top: 0, fontFamily: 'Times New Roman, Times, serif' }}>Users Information</h2>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to = "/create" style={{ marginTop:'10px',marginBottom:'15px' }}className = 'btn btn-outline-dark'>Add</Link>
            
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="form-control mt-3"
        style={{ width: '400px', marginLeft:'1070px',marginBottom: '15px', borderRadius: '20px' }}
        />
        </div>

                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>
                        <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('firstname')}>
                                    First Name {getSortIndicator('firstname')}
                                </th>
                                <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('lastname')}>
                                    Last Name {getSortIndicator('lastname')}
                                </th>
                                <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('email')}>
                                    Email {getSortIndicator('email')}
                                </th>
                                <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('phonenumber')}>
                                    Phone Number {getSortIndicator('phonenumber')}
                                </th>
                                <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('age')}>
                                    Age (in years) {getSortIndicator('age')}
                                </th>
                                <th style={{ backgroundColor: '#00246B', color: 'white', cursor: 'pointer' }} onClick={() => handleSort('city')}>
                                    City {getSortIndicator('city')}
                                </th>

                            <th style={{ backgroundColor: '#00246B', color: 'white' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflowY: 'auto' }}>
                        {
                            paginatedUsers.map((user) => (
                                <tr>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.firstname}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.lastname}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.email}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.phonenumber}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.age}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>{user.city}</td>
                                    <td style={{ backgroundColor: '#00246B', color: 'white' }}>
                                    <Link to = {`/update/${user._id}`} className = 'btn btn-outline-light'>Update</Link>
                                    
                                        <button style={{ marginLeft: '6px' }} className = 'btn btn-outline-danger' 
                                        onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                
                    </tbody>
                </table>
                {paginatedUsers.length  < filteredUsers.length && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={showMoreRows}>Show More(Next 8)</button>
                </div>
                )}
                </div>
                
            </div>
        </>
    )
}

export default Users;