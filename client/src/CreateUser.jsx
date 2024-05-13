import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Loader() {
    return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center" style={{ backgroundColor: '#6c757d' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
}

function CreateUser () {
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phonenumber, setPhoneNumber] = useState()
    const [age, setAge] = useState()
    const [city, setCity] = useState()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        
        const nameRegex = /^[A-Za-z]+$/;
        if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
        alert("First name and last name should contain only alphabets.");
        return;
        }

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!email.match(emailRegex)) {
        alert("Please enter a valid email address.");
        return;
        }

        const phoneNumberRegex = /^[0-9]+$/;
        if (!phonenumber.match(phoneNumberRegex) || phonenumber.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
        }
        
        const ageNumber = parseInt(age);
        if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber >= 100) {
        alert("Please enter a valid age between 1 and 99.");
        return;
        }
        
        if (!city.match(nameRegex)) {
        alert("City should contain only alphabets.");
        return;
        }

        setLoading(true);

        axios.post("http://localhost:3001/createUser", {firstname, lastname, email, phonenumber, age, city})
        .then(result => {
            console.log(result)
            setLoading(false);
            navigate('/')
            alert("User data updated successfully!");
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            alert("Error updating user data. Please try again later.");
        })
    }

    if (loading) {
        return <Loader />;
    }

    return(
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#6c757d' }}>
            <div className="w-50 rounded p-3" style={{ backgroundColor: '#000', color: 'white' }}>
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="Enter First Name" className="form-control"
                        onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" className="form-control"
                        onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter email" className="form-control"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter phone number" className="form-control"
                        onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"
                        onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">City</label>
                        <input type="text" placeholder="Enter City" className="form-control"
                        onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <button className="btn btn-outline-light">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;