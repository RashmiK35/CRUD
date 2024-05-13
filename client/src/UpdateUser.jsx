import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Loader() {
    return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center" style={{ backgroundColor: '#6c757d' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
}

function UpdateUser () {
    const {id} = useParams()
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phonenumber, setPhoneNumber] = useState()
    const [age, setAge] = useState()
    const [city, setCity] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+ id)
        .then(result => {console.log(result)
            setFirstName(result.data.firstname)
            setLastName(result.data.lastname)
            setEmail(result.data.email)
            setPhoneNumber(result.data.phonenumber)
            setAge(result.data.age)
            setCity(result.data.city)
            setLoading(false);
    })
        .catch(err => console.log(err))

    }, [])

    const Update = (e) => {
        e.preventDefault();

        const nameRegex = /^[A-Za-z]+$/;
        if (!firstname.match(nameRegex) || !lastname.match(nameRegex)) {
        window.alert("First name and last name should contain only alphabets.");
        return;
        }

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!email.match(emailRegex)) {
        window.alert("Please enter a valid email address.");
        return;
        }

        const phoneNumberRegex = /^[0-9]+$/;
        if (!phonenumber.match(phoneNumberRegex) || phonenumber.length !== 10) {
        window.alert("Please enter a valid 10-digit phone number.");
        return;
        }

    
        const ageNumber = parseInt(age);
        if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber >= 100) {
        window.alert("Please enter a valid age between 1 and 99.");
        return;
        }

    
        if (!city.match(nameRegex)) {
        window.alert("City should contain only alphabets.");
        return;
        }

        axios.put("http://localhost:3001/updateUser/" + id, {firstname, lastname, email, phonenumber, age, city})
        .then(result => {
            console.log(result);
            window.alert("User data updated successfully!");
            navigate('/')
        })
        .catch(err => {
            console.log(err);
            window.alert("Error updating user data. Please try again.");
        })
        .finally(() => setLoading(false));
    }

    if (loading) {
        return <Loader />;
    }

    return(
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#6c757d' }}>
            <div className="w-50 rounded p-3" style={{ backgroundColor: '#000' , color: 'white'}}>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="Enter First Name" className="form-control"
                        value = {firstname} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" className="form-control"
                        value = {lastname} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter email" className="form-control"
                        value = {email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter phone number" className="form-control"
                        value = {phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"
                        value = {age} onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">City</label>
                        <input type="text" placeholder="Enter City" className="form-control"
                        value = {city} onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <button className="btn btn-outline-light">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;