import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Loader() {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#CADCFC' }}>
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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z]+$/;

        if (!firstname) {
            newErrors.firstname = "First name is required.";
        } else if (!firstname.match(nameRegex)) {
            newErrors.firstname = "First name should contain only alphabets.";
        }

        if (!lastname) {
            newErrors.lastname = "Last name is required.";
        } else if (!lastname.match(nameRegex)) {
            newErrors.lastname = "Last name should contain only alphabets.";
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!email.match(emailRegex)) {
            newErrors.email = "Please enter a valid email address.";
        }

        const phoneNumberRegex = /^[0-9]+$/;
        if (!phonenumber) {
            newErrors.phonenumber = "Phone number is required.";
        } else if (!phonenumber.match(phoneNumberRegex) || phonenumber.length !== 10) {
            newErrors.phonenumber = "Please enter a valid 10-digit phone number.";
        }

        if (!age) {
            newErrors.age = "Age is required.";
        } else if (!/^\d+$/.test(age)) {
            newErrors.age = "Please enter a valid age using only numbers.";
        } else {
            const ageNumber = parseInt(age);
            if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber >= 100) {
                newErrors.age = "Please enter a valid age between 1 and 99.";
            }
        }

        if (!city) {
            newErrors.city = "City is required.";
        } else if (!city.match(nameRegex)) {
            newErrors.city = "City should contain only alphabets.";
        }

        return newErrors;
    };


    const Submit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#CADCFC' }}>
            <div className="w-50 rounded p-3" style={{ backgroundColor: '#00246B', color: 'white' }}>
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">First Name *</label>
                        <input type="text" placeholder="Enter First Name" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Last Name *</label>
                        <input type="text" placeholder="Enter Last Name" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email *</label>
                        <input type="text" placeholder="Enter email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone Number *</label>
                        <input type="text" placeholder="Enter phone number" className="form-control" onChange={(e) => setPhoneNumber(e.target.value)} />
                        {errors.phonenumber && <small className="text-danger">{errors.phonenumber}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age *</label>
                        <input type="text" placeholder="Enter Age" className="form-control" onChange={(e) => setAge(e.target.value)} />
                        {errors.age && <small className="text-danger">{errors.age}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">City *</label>
                        <input type="text" placeholder="Enter City" className="form-control" onChange={(e) => setCity(e.target.value)} />
                        {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>
                    <button className="btn btn-outline-light">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;