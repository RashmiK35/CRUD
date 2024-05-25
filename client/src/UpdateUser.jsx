import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Loader() {
    return (
      <div className="d-flex vh-100  justify-content-center align-items-center" style={{ backgroundColor: '#CADCFC' }}>
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
    const [errors, setErrors] = useState({});
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

    }, [id])

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

    const Update = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);


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
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#CADCFC' }}>
            <div className="w-50 rounded p-3" style={{ backgroundColor: ' #00246B' , color: 'white'}}>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="firstname">First Name *</label>
                        <input type="text" id="firstname" placeholder="Enter First Name" className="form-control"
                            value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastname">Last Name *</label>
                        <input type="text" id="lastname" placeholder="Enter Last Name" className="form-control"
                            value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email *</label>
                        <input type="text" id="email" placeholder="Enter email" className="form-control"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phonenumber">Phone Number *</label>
                        <input type="text" id="phonenumber" placeholder="Enter phone number" className="form-control"
                            value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {errors.phonenumber && <small className="text-danger">{errors.phonenumber}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age *</label>
                        <input type="text" id="age" placeholder="Enter Age" className="form-control"
                            value={age} onChange={(e) => setAge(e.target.value)} />
                        {errors.age && <small className="text-danger">{errors.age}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="city">City *</label>
                        <input type="text" id="city" placeholder="Enter City" className="form-control"
                            value={city} onChange={(e) => setCity(e.target.value)} />
                        {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>
                    <button className="btn btn-outline-light">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;